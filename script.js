// --- Animação de Escrita para o Título Principal ---
document.addEventListener('DOMContentLoaded', () => {
    const logoElement = document.getElementById('logo');
    const logoText = logoElement.textContent;
    logoElement.textContent = ''; // Limpa o texto original

    let i = 0;
    const typingInterval = setInterval(() => {
        if (i < logoText.length) {
            logoElement.textContent += logoText.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
        }
    }, 100); // Velocidade da digitação em milissegundos
});

// --- Lógica do Quiz ---
let currentQuestion = 1;
let score = 0;
const totalQuestions = 3;

function selectAnswer(questionNumber, selectedAnswer) {
    const correctAnswer = getCorrectAnswer(questionNumber);

    // Desabilita botões da questão atual para evitar cliques múltiplos
    const questionElement = document.getElementById(`question-${questionNumber}`);
    questionElement.querySelectorAll('button').forEach(button => {
        button.disabled = true;
    });

    // Verifica a resposta
    if (selectedAnswer === correctAnswer) {
        score++;
        // Destaca a resposta correta (opcional, mas bom para feedback)
        questionElement.querySelector(`button[onclick="selectAnswer('${questionNumber}', '${selectedAnswer}')"]`).classList.add('correct');
    } else {
        // Destaca a resposta incorreta e a correta
        questionElement.querySelector(`button[onclick="selectAnswer('${questionNumber}', '${selectedAnswer}')"]`).classList.add('incorrect');
        questionElement.querySelector(`button[onclick="selectAnswer('${questionNumber}', '${correctAnswer}')"]`).classList.add('correct');
    }

    // Avança para a próxima questão ou mostra resultados
    setTimeout(() => {
        if (currentQuestion < totalQuestions) {
            document.getElementById(`question-${currentQuestion}`).classList.add('hidden');
            currentQuestion++;
            document.getElementById(`question-${currentQuestion}`).classList.remove('hidden');
        } else {
            showResults();
        }
    }, 1500); // Espera 1.5 segundos para o usuário ver o feedback
}

function getCorrectAnswer(questionNumber) {
    // Define as respostas corretas para cada questão
    const answers = {
        '1': 'b', // Otimização do uso de recursos
        '2': 'c', // Melhorar a qualidade do solo e reter água
        '3': 'c'  // Agricultura Orgânica
    };
    return answers[questionNumber];
}

function showResults() {
    document.getElementById('quiz-container').classList.add('hidden');
    const resultsElement = document.getElementById('results');
    resultsElement.classList.remove('hidden');

    const scoreTextElement = document.getElementById('score-text');
    const feedbackTextElement = document.getElementById('feedback-text');

    scoreTextElement.textContent = `${score} de ${totalQuestions} corretas`;

    let feedback = '';
    if (score === totalQuestions) {
        feedback = "Parabéns! Você é um expert em agricultura sustentável!";
    } else if (score >= totalQuestions / 2) {
        feedback = "Muito bom! Você tem um bom conhecimento sobre o tema.";
    } else {
        feedback = "Continue aprendendo! Há muito para descobrir sobre o futuro da agricultura sustentável.";
    }
    feedbackTextElement.textContent = feedback;
}

function restartQuiz() {
    currentQuestion = 1;
    score = 0;

    document.getElementById('results').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');

    document.querySelectorAll('.quiz-question').forEach((q, index) => {
        q.classList.add('hidden');
        // Resetar estilos dos botões (se houver)
        q.querySelectorAll('button').forEach(button => {
            button.classList.remove('correct', 'incorrect');
            button.disabled = false;
        });
    });

    document.getElementById('question-1').classList.remove('hidden');
}

// --- Animação Sutil ao Scroll (Opcional) ---
document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY;

        // Se a seção estiver visível na tela
        if (scrollPosition + windowHeight > sectionTop + 50) { // Adiciona um pequeno offset
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        } else {
            // Mantém opaco para não desaparecer completamente
            section.style.opacity = '0.5';
            section.style.transform = 'translateY(20px)';
        }
    });
});

// Inicializa a opacidade e transformação para as seções
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0.5';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
});

