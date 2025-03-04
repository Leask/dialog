import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import audioconcat from 'audioconcat';
import ffmpeg from 'fluent-ffmpeg';
import { speech } from 'utilitas';
import config from './config.mjs';

await speech.init({
    provider: 'OPENAI',
    apiKey: config.openAiToken,
    tts: true,
});

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const scripts = [
    ["alloy", "Two people are meeting at the party."],
    ["nova", "Hi, my name is Emily."],
    ["nova", "What's your name ?"],
    ["onyx", "Hi Emily! I'm Daniel."],
    ["nova", "Nice to meet you."],
    ["nova", "Could you say your name again ?"],
    ["onyx", "Sure, it's Daniel."],
    ["nova", "Hi, Daniel. How are you doing ?"],
    ["onyx", "I'm fine, thank you. How about you ?"],
    ["nova", "Great, thanks. It's nice to meet you!"],
    ["onyx", "It's nice to meet you, too! Talk to you later."],
];

const output = '/Users/leask/Desktop/output.mp3';

const arrResult = [];

for (let i in scripts) {
    const result = await speech.tts(scripts[i][1], {
        expected: 'FILE',
        params: {
            voice: scripts[i][0],
            response_format: 'mp3',
            speed: 0.8,
        },
    });
    arrResult.push(result);
    console.log(`${i}/${scripts.length}`, result);
}

audioconcat(arrResult)
    .concat(output)
    .on('start', function(command) {
        console.log('FFmpeg process started:', command);
    })
    .on('error', function(err, stdout, stderr) {
        console.error('Error:', err);
        console.error('FFmpeg stderr:', stderr);
    })
    .on('end', function(output) {
        console.log('Audio created in:', output);
    });
