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
    ['onyx', "Good afternoon.How can I help you today ?"],
    ['nova', "Good afternoon.I am here to pick up a prescription for this persistent cough I've been having."],
    ['onyx', "Certainly.Can I get your last name, please ?"],
    ['nova', "It’s Graham.G - R - A - H - A - M."],
    ['onyx', "Thank you.Yes, I see it here.One moment.Okay, Mr.Graham, this is a cough syrup.Have you taken this medication before ?"],
    ['nova', "No, this is my first time."],
    ['onyx', "Alright.You need to take 10 mL twice a day, once in the morning and once in the evening, for five days.Be sure to use the measuring spoon provided to ensure the proper dosage."],
    ['nova', "Okay, 10 mL twice a day.Are there any side effects I should be aware of ?"],
    ['onyx', "Yes, the most common side effect is a dry mouth.Some people also experience slight drowsiness, so avoid operating heavy machinery or driving.And are you currently taking any other medications, including over - the - counter drugs or herbal supplements ?"],
    ['nova', "Yes, I take Vitamin D every morning."],
    ['onyx', "Okay, this medicine is safe to take with Vitamin D.But it's always best to check with your doctor if you have any new concerns. Also, all of these instructions and precautions are clearly labelled on the bottle for your reference."],
    ['nova', "Great, thank you for all the information!"],
    ['onyx', "You’re welcome, Mr.Graham.Just remember to store the syrup in a cool, dry place, away from direct sunlight.Feel better soon!"],
    ['nova', "Thank you very much! Have a nice day!"],
    ['onyx', "You too.Take care."],

    // ['nova', "Hello, I’m here to pick up my prescription. My doctor called it in earlier."],
    // ['onyx', "Okay. Can I confirm your date of birth?"],
    // ['nova', "July 20, 1993."],
    // ['onyx', "Thank you. Okay, Sarah, we have your prescription for amoxicillin. You need to take one capsule three times a day for ten days. Try to take it at the same time each day – morning, afternoon, and evening – to keep a steady level of the medicine in your body."],
    // ['nova', "Okay, one capsule, three times a day, for ten days. Should I take it with food?"],
    // ['onyx', "Yes, it’s best to take it with food to avoid stomach upset. Also, it’s important to finish all the capsules, even if you start feeling better before the ten days are up."],
    // ['nova', "Okay, I will. Are there any side effects?"],
    // ['onyx', "Some people experience mild nausea or diarrhea. If these side effects become severe, or if you develop a rash, stop taking the medication and contact your doctor immediately. Also, are you taking any other medications or supplements?"],
    // ['nova', "I take a multivitamin every day."],
    // ['onyx', "That’s fine. Amoxicillin is generally safe with multivitamins. However, avoid taking any antacids at the same time as amoxicillin. Wait at least 2 hours."],
    // ['nova', "Good to know. So no antacids at the same time. Anything else I should keep in mind?"],
    // ['onyx', "Just make sure to store the capsules in a cool, dry place, away from children. And if you don’t finish all the medication for whatever reason, don’t flush them down the toilet. Bring them back to the pharmacy for safe disposal."],
    // ['nova', "Okay. Thank you so much for your help!"],
    // ['onyx', "You're welcome."],
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
