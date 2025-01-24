import { speech } from 'utilitas'
import fs from 'fs/promises'

await speech.init({
    provider: 'OPENAI',
    apiKey: '',
    tts: true,
});

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

const str = 'Hello, this is a test.';

for (let i in scripts) {
    const result = await speech.tts(scripts[i][1], {
        expected: 'FILE',
        params: {
            voice: scripts[i][0],
            response_format: 'mp3',
            speed: 0.8,
        },
    });
    await fs.rename(result, `/Users/leask/Desktop/${i}.mp3`);
    console.log(`${i}/${scripts.length}`, result);
}
