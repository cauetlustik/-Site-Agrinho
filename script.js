document.addEventListener('DOMContentLoaded', () => {
    // --- Animação de Escrita para o Título Principal (header) ---
    const logoElement = document.getElementById('logo');
    // O CSS agora cuida da animação de escrita no header
    // Podemos usar o JS para outras coisas, como parallax ou scroll effects

    // --- Animação de Entrada para Seções ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Para que a animação ocorra apenas uma vez
            }
        });
    }, {
        threshold: 0.2 // Começa a animar quando 20% do elemento está visível
    });

    document.querySelectorAll('.section, .card, .solution-item, .impact-item').forEach(element => {
        element.classList.add('fade-in'); // Adiciona a classe base para animação
        observer.observe(element);
    });

    // --- Animação Pulsante no Botão Hero ---
    const animatedBtn = document.querySelector('.animated-btn');
    if (animatedBtn) {
        // A animação 'pulse' já está no CSS, mas podemos adicionar interatividade se quisermos
    }

    // --- Quiz Lógica ---
    setupQuiz();
});

// --- Lógica do Quiz Aprimorada ---
let currentQuestionIndex = 0;
let score = 0;
const questions = [
    {
        question: "Qual a principal vantagem da Agricultura de Precisão?",
        options: [
            "a) Aumento do uso de defensivos",
            "b) Otimização do uso de recursos e redução de custos",
            "c) Maior dependência de mão de obra braçal",
            "d) Redução da qualidade dos produtos"
        ],
        correctAnswer: "b"
    },
    {
        question: "Sistemas Agroflorestais (SAFs) contribuem para:",
        options: [
            "a) A concentração de nutrientes em uma única cultura",
            "b) Aumentar a erosão do solo e poluição hídrica",
            "c) A melhoria da qualidade do solo, sequestro de carbono e aumento da biodiversidade",
            "d) A simplificação do manejo e eliminação de pragas"
        ],
        correctAnswer: "c"
    },
    {
        question: "O que define a Agricultura Orgânica e Regenerativa?",
        options: [
            "a) Uso intensivo de fertilizantes químicos e agrotóxicos de última geração",
            "b) Foco na saúde do solo, uso de insumos naturais e evitação de químicos sintéticos",
            "c) Criação de animais em confinamento para otimizar espaço",
            "d) Produção exclusiva de grãos em grandes monoculturas"
        ],
        correctAnswer: "b"
    }
];

function setupQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    // Limpa o conteúdo anterior e cria a primeira pergunta
    quizContainer.innerHTML = ''; // Limpa para reconstruir
    displayQuestion();
}

function displayQuestion() {
    const quizContainer = document.getElementById('quiz-container');
    const questionData = questions[currentQuestionIndex];

    const questionDiv = document.createElement('div');
    questionDiv.id = `question-${currentQuestionIndex + 1}`;
    questionDiv.classList.add('quiz-question');

    const questionText = document.createElement('p');
    questionText.textContent = questionData.question;
    questionDiv.appendChild(questionText);

    questionData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => selectAnswer(currentQuestionIndex, option.charAt(0)); // Usa a primeira letra (a, b, c, d)
        questionDiv.appendChild(button);
    });

    quizContainer.appendChild(questionDiv);
}

function selectAnswer(questionIndex, selectedAnswer) {
    const correctAnswer = questions[questionIndex].correctAnswer;
    const currentQuestionElement = document.getElementById(`question-${questionIndex + 1}`);
    const buttons = currentQuestionElement.querySelectorAll('button');

    // Desabilita todos os botões da questão atual
    buttons.forEach(button => button.disabled = true);

    let correctButton = null;
    let selectedButton = null;

    buttons.forEach(button => {
        const answerLetter = button.textContent.charAt(0).toLowerCase();
        if (answerLetter === correctAnswer) {
            button.classList.add('correct');
            correctButton = button;
        }
        if (answerLetter === selectedAnswer) {
            button.classList.add('incorrect');
            selectedButton = button;
        }
    });

    // Se a resposta selecionada foi incorreta, destaca-a
    if (selectedAnswer !== correctAnswer) {
        selectedButton.classList.add('incorrect');
    } else {
        score++;
        selectedButton.classList.add('correct'); // Marca a resposta correta se foi a selecionada
    }

    // Espera um pouco para mostrar o feedback
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            currentQuestionElement.classList.add('hidden');
            displayQuestion(); // Carrega a próxima pergunta
            // Para garantir que a nova pergunta apareça com animação
            setTimeout(() => {
                document.getElementById(`question-${currentQuestionIndex + 1}`).classList.remove('hidden');
            }, 50);
        } else {
            showResults();
        }
    }, 1800);
