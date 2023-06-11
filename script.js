
function getDefinition() {
  const wordInput = document.getElementById('word');
  const word = wordInput.value;
  
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => response.json())
    .then(data => {
      const definitionsContainer = document.getElementById('definitions');
      definitionsContainer.innerHTML = '';
      const processedWords = []; // Array to keep track of processed words

      if (Array.isArray(data)) {
        data.forEach(entry => {
          const { word, meanings, phonetics } = entry;

          if (!processedWords.includes(word)) { // Check if word is already processed
            processedWords.push(word); // Add word to processedWords array

            if (word) {
  const wordElement = `<h3>${word}</h3>`;
  definitionsContainer.insertAdjacentHTML('beforeend', wordElement);
}

if (phonetics && Array.isArray(phonetics) && phonetics.length > 0 && phonetics[0].audio) {
  const audioUrl = phonetics[0].audio;
  const playButton = `<button onclick="playAudio('${audioUrl}')" id="play-button"><i class="fas fa-play"></i></button>`;
  definitionsContainer.insertAdjacentHTML('beforeend', playButton);
}

            if (entry.hasOwnProperty('wordtype')) {
              const wordType = `<p>${entry.wordtype}</p>`;
              definitionsContainer.insertAdjacentHTML('beforeend', wordType);
            }

            if (Array.isArray(meanings)) {
              meanings.forEach(meaning => {
                const { partOfSpeech, definitions, examples } = meaning;

                const partOfSpeechElement = `<h4> ${partOfSpeech} </h4>`;
                definitionsContainer.insertAdjacentHTML('beforeend', partOfSpeechElement);

                if (Array.isArray(definitions)) {
                  definitions.forEach(definition => {
                    const definitionElement = `<p><i class="fas fa-bookmark"></i>&nbsp&nbsp${definition.definition}</p>`;
                    definitionsContainer.insertAdjacentHTML('beforeend', definitionElement);
                  });
                }

                if (Array.isArray(examples)) {
                  examples.forEach(example => {
                    const exampleElement = `<p><em>Example:</em> ${example.example}</p>`;
                    definitionsContainer.insertAdjacentHTML('beforeend', exampleElement);
                  });
                }
              });
            }
          }
        });
      } else {
        const errorMessage = `<h5>No definitions found for '${word}'</h5>`;
        definitionsContainer.insertAdjacentHTML('beforeend',errorMessage ) ;
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function playAudio(audioUrl) {
  const audio = new Audio(audioUrl);
  audio.play();
}

