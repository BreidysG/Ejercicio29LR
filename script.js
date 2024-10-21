let currentWords = []; // Palabras actuales que se deben buscar en la ronda
let foundWords = []; // Palabras encontradas en total durante la partida
let errorWords = []; // Palabras seleccionadas incorrectamente
let roundWordsFound = []; // Palabras encontradas en la ronda actual
let totalWordsFound = 0; // Contador acumulativo de palabras encontradas en todas las rondas
let timer; // Control del temporizador
let gameActive = false; // Control del estado del juego
let usedWords = []; // Almacena palabras usadas en la ronda actual

// Función para iniciar el juego
function startGame() {
    foundWords = []; // Reiniciar las palabras encontradas en cada nueva partida
    errorWords = []; // Reiniciar los errores en cada nueva partida
    roundWordsFound = []; // Reiniciar las palabras encontradas en la ronda actual
    totalWordsFound = 0; // Reiniciar el contador acumulativo
    usedWords = []; // Reiniciar las palabras usadas
    gameActive = true; // Activar el juego
    updateFoundWordsDisplay();
    updateErrorsDisplay();
    loadNewWords();
    startTimer();

    // Mostrar el contenedor de palabras y resultados
    document.getElementById('wordList').classList.remove('hidden');
    document.getElementById('foundWords').classList.remove('hidden');
    document.getElementById('errors').classList.remove('hidden');
    document.getElementById('timer').classList.remove('hidden');
    document.getElementById('p1').classList.add('hidden');
    document.getElementById('p2').classList.add('hidden');
    document.getElementById('p3').classList.add('hidden');
    document.getElementById('startButton').classList.add('hidden');
}

// Función para obtener palabras únicas
function getUniqueWords(words, count, excludeWords = []) {
    const filteredWords = words.filter(word => !excludeWords.includes(word)); // Filtrar palabras excluidas
    const shuffledWords = filteredWords.sort(() => Math.random() - 0.5); // Mezclar palabras
    return shuffledWords.slice(0, count); // Seleccionar las primeras 'count' palabras
}

// Lista de palabras disponibles
const availableWords = [
"18585", "34203", "21481", "61909", "95291",  
"71040", "77562", "59541", "72811", "98131",  
"70462", "86790", "94044", "49914", "13068",  
"65256", "86587", "40071", "65341", "11185",  
"89324", "64835", "43053", "23912", "44805",  
"27796", "14876", "76498", "75680", "48321",  
"61373", "59286", "81837", "86087", "33473",  
"46676", "49183", "15433", "73252", "83083",  
"70718", "83876", "55479", "58982", "40474",  
"26981", "76124", "67905", "94423", "15421",  
"98123", "80018", "53557", "42901", "29128",  
"56530", "43307", "58656", "52003", "45564",  
"91086", "93884", "41163", "67518", "98502",  
"16711", "15352", "96280", "67882", "14252",  
"81217", "29187", "11202", "54900", "43907",  
"39526", "42632", "55787", "25959", "34212",  
"65230", "35018", "70596", "29145", "61625",  
"70632", "81572", "74508", "21223", "82774",  
"17466", "59333", "78985", "40765", "45704",  
"61380", "65787", "22850", "34856", "35824",  
"28263", "57079", "40069", "20784", "38298",  
"48222", "39048", "80747", "14967", "80717",  
"98185", "59832", "80270", "68644", "72277",  
"41317", "71719", "74046", "85751", "47220",  
"36589", "23452", "17766", "47071", "15757",  
"34505", "52118", "28129", "93775", "59433",  
"49760", "71019", "30394", "88612", "87029",  
"91309", "15984", "65805", "65729", "21294",  
"73456", "15821", "33622", "63938", "45827",  
"88060", "45459", "56980", "82148", "91406",  
"66936", "41591", "36443", "16728", "54462",  
"48420", "68710", "50406", "37210", "74723",  
"68147", "36372", "38127", "71899", "69202",  
"90896", "24820", "54989", "75574", "48310",  
"27113", "99798", "72143", "13465", "11254",  
"60015", "36285", "49505", "56943", "59976",  
"23228", "10991", "57437", "44704", "64582",  
"92747", "87539", "25630", "50792", "72299",  
"35264", "44173", "68776", "14096", "68335",  
"80320", "92395", "53563", "64884", "22005",  
"78248", "95505", "59490", "32939", "14213",  
"95410", "22602", "57364", "70641", "12352",  
"55315", "76190", "11388", "54119", "84881",  
"98376", "12289", "80969", "18177", "61310",  
"99633", "99006", "68792", "42425", "87992",  
"91425", "97782", "71801", "71552", "71571",  
"11703", "47428", "15761", "42457", "62291",  
"64967", "36248", "38988", "41119", "64051",  
"70177", "13848", "58518", "35394", "73276",  
"82051", "46063", "40739", "20032", "33853",  
"18663", "59311", "52473", "57462", "16387",  
"10281", "40178", "49815", "94969", "42450",  
"90812", "65888", "97282", "42131", "42812",  
"33091", "45889", "21069", "84945", "74027",  
"77870", "29615", "61082", "52599", "10681",  
"63669", "38286", "37333", "93800", "52893",  
"83502", "12068", "44131", "21585", "31506",  
"74285", "75987", "20184", "60276", "38100",  
"51085", "23136", "83343", "84652", "93632",  
"72177", "32747", "16713", "10473", "90593",  
"10555", "90770", "34518", "28419", "91505",  
"52765", "12983", "40996", "75559", "62928",  
"51717", "67468", "12487", "19968", "25925",  
"23759", "90025", "25150", "98310", "48798",  
"65999", "18745", "90140", "34008", "33625",  
"76297", "63083", "93403", "52494", "75900",  
"49851", "52660", "28645", "27418", "39554",  
"69883", "72837", "75191", "92495", "15430",  
"78449", "38443", "80510", "40668", "78268",  
"63928", "43915", "91268", "69785", "13304",  
"41279", "73062", "57042", "90975", "18561",  
"18928", "53092", "70357", "39222", "75129",  
"43678", "83141", "42295", "92876", "56373",  
"10855", "89354", "85892", "37369", "29558",  
"75743", "60377", "74114", "84595", "19299",  
"65433", "18801", "74723", "64341", "45139",  
"96599", "33079", "75688", "67581", "73402",  
"77560", "66930", "34052", "62215", "82013",  
"69935", "33477", "76215", "84273", "91102",  
"91204", "67296", "78121", "39747", "28512",  
"89095", "40840", "50551", "45789", "76509",  
"83414", "59064", "63167", "62582", "59670",  
"55281", "66399", "66061", "33580", "82977",  
"34320", "55348", "32327", "33202", "25310",  

    // Agrega más palabras si es necesario
];

// Función para verificar la palabra seleccionada
function checkWord(event) {
    if (!gameActive) return; // No hacer nada si el juego no está activo

    const word = event.target.innerText;

    // Comprobar si la palabra seleccionada es una de las palabras correctas en la ronda
    if (currentWords.includes(word)) {
        // Añadir la palabra a la lista de palabras encontradas en la ronda si no está ya presente
        if (!roundWordsFound.includes(word)) {
            roundWordsFound.push(word);
            totalWordsFound++; // Aumentar el contador acumulativo de palabras encontradas
            updateFoundWordsDisplay();
            event.target.classList.add('found'); // Cambiar el fondo a verde

            // Verificar si se encontraron todas las palabras de la ronda
            if (roundWordsFound.length === currentWords.length) {
                setTimeout(() => {
                    roundWordsFound = []; // Reiniciar las palabras de la ronda
                    loadNewWords(); // Cargar nuevas palabras para la siguiente ronda
                }, 1000);
            }
        }
    } else {
        // Si la palabra seleccionada es incorrecta
        if (!errorWords.includes(word)) {
            errorWords.push(word);
            event.target.classList.add('error');
            updateErrorsDisplay();
        }
    }
}

// Función para cargar nuevas palabras en el tablero
function loadNewWords() {
    // Obtener 40 palabras únicas para el tablero, excluyendo las que ya se han usado en rondas anteriores
    const gridWords = getUniqueWords(availableWords, 40, usedWords);
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = ''; // Limpiar palabras anteriores

    // Mostrar las palabras en el tablero
    gridWords.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'word';
        wordDiv.textContent = word;
        wordDiv.addEventListener('click', checkWord); // Habilitar los eventos de clic
        gridContainer.appendChild(wordDiv);
    });

    // Seleccionar 5 palabras únicas al azar de las 40 palabras del tablero para buscar en esta ronda
    currentWords = getUniqueWords(gridWords, 5); // Seleccionar 5 palabras correctas de gridWords
    usedWords.push(...currentWords); // Añadir palabras actuales a las usadas
    document.getElementById('currentWord').textContent = currentWords.join(', '); // Mostrar las palabras a buscar
}

// Función para iniciar el temporizador
function startTimer() {
    const duration = 180; // Duración del juego en segundos (3 minutos)
    let timeLeft = duration;

    // Actualizar el temporizador en pantalla cada segundo
    timer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('timer').innerHTML = `Tiempo restante: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer);
            endGame(); // Llamar al final del juego cuando el tiempo se acabe
        }
    }, 1000);
}

// Función para mostrar la cantidad de palabras encontradas (acumulativo)
function updateFoundWordsDisplay() {
    const foundWordsList = document.getElementById('foundWords');
    foundWordsList.innerHTML = `Números encontrados en total: ${totalWordsFound}`;
}

// Función para mostrar la cantidad de errores
function updateErrorsDisplay() {
    const errorWordsList = document.getElementById('errors');
    errorWordsList.innerHTML = `Errores: ${errorWords.length}`;
}

// Función para finalizar el juego cuando el tiempo se agota
function endGame() {
    clearInterval(timer); // Detener el temporizador
    gameActive = false; // Desactivar el juego
    alert("¡Se acabó el tiempo! El juego ha terminado.");
    document.getElementById('p4').classList.remove('hidden');
    document.getElementById('wordList').classList.add('hidden');
    document.getElementById('gridContainer').classList.add('hidden');
}

// Evento para iniciar el juego cuando se carga la página
window.onload = () => {
    document.getElementById('startButton').addEventListener('click', startGame);
};
