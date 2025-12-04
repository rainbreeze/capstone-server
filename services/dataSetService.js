const axios = require('axios');

//전처리 함수 따로 만들기 -> service

//전처리 전 기본 dataset
const defaultDataset = [
    { name: "danceability", avg: 0.5, min: 0, max: 1 },
    { name: "energy", avg: 0.5, min: 0, max: 1 },
    { name: "key,", avg: 5, min: -1, max: 11 },
    { name: "loudness", avg: 0, min: -60, max: 0 },
    { name: "mode", avg: 0, min: 0, max: 1 }, // 0 아니면 1
    { name: "speechiness", avg: 0.4, min: 0, max: 1 },
    { name: "acousticness", avg: 0.4, min: 0, max: 1 },
    { name: "instrumentalness", avg: 0.2, min: 0, max: 1 },
    { name: "liveness", avg: 0.2, min: 0, max: 1 },
    { name: "valence", avg: 0.5, min: 0, max: 1 },
    { name: "tempo", avg: 120, min: 0, max: 200 }, //bpm 기준이기 때문에 max 값을 임의로 200으로 설정
];

function getDataset() {
    return JSON.parse(JSON.stringify(defaultDataset));
}

function applyChoices(dataset, choices) {
    choices.forEach(effect => {
        for (let key in effect) {
            const item = dataset.find(it => it.name === key);
            if (item) {
                item.avg += effect[key];
                if (item.avg < item.min) item.avg = item.min;
                if (item.avg > item.max) item.avg = item.max;
            }
        }
    });
    return dataset;
}


//스탯에 의한 dataset변경
function applyStats(dataset, { steps, jumps, sprints, playTime }) {

    // steps 30마다 0.05 증가
    const stepIncrement = Math.floor(steps / 30) * 0.05;
    const dance = dataset.find((item) => item.name === "danceability");
    if (dance) {
        dance.avg = Math.min(dance.avg + stepIncrement, dance.max);
    }

    // jumps 5마다 0.05 증가
    const jumpIncrement = Math.floor(jumps / 5) * 0.05;
    const energy = dataset.find((item) => item.name === "energy");
    if (energy) {
        energy.avg = Math.min(energy.avg + jumpIncrement, energy.max);
    }

    // sprints 5마다 5BPM 증가
    const sprintIncrement = Math.floor(sprints / 5) * 5;
    const tempo = dataset.find((item) => item.name === "tempo");
    if (tempo) {
        tempo.avg = Math.min(tempo.avg + sprintIncrement, tempo.max);
    }

    // playTime 60초마다 0.05 증가
    const playTimeIncrement = Math.floor(playTime / 30) * 0.05;
    const valence = dataset.find((item) => item.name === "valence");
    if (valence) {
        valence.avg = Math.min(valence.avg + playTimeIncrement, valence.max);
    }

    return dataset

}

function createAnswerJSON(dataset) {
    return dataset.map((item) => ({
        name: item.name,
        avg: item.avg,
    }));
}


//머신러닝 넣기 전 전처리 작업
function convertDatasetToFormData(dataset) {
    const formData = {};

    dataset.forEach((item) => {
        // avg 값을 그대로 사용, key 이름에 쉼표 제거
        const key = item.name.replace(",", "");

        //payload 역할
        formData[key] = parseFloat(item.avg);
    });

    return formData;
}

module.exports = {
    getDataset,
    applyStats,
    applyChoices,
    createAnswerJSON,
    convertDatasetToFormData
};