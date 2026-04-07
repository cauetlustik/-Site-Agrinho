// ============================
// MENU MOBILE
// ============================
const hamburger = document.getElementById('hamburger');
const menu = document.querySelector('nav');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// ============================
// SCROLLREVEAL SIMPLES
// ============================
const reveals = document.querySelectorAll('.reveal');

function reveal() {
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// ============================
// BOTÃO VOLTAR AO TOPO
// ============================
const topBtn = document.getElementById('topBtn');

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
};

topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================
// FORMULÁRIO DE CONTATO
// ============================
const form = document.getElementById('formContato');
const msg = document.getElementById('msg');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if(nome === '' || email === '' || mensagem === '') {
        msg.textContent = 'Por favor, preencha todos os campos!';
        msg.style.color = 'red';
        return;
    }

    // Simula envio
    msg.textContent = 'Mensagem enviada com sucesso!';
    msg.style.color = 'green';
    form.reset();
});

// ============================
// QUIZ INTERATIVO
// ============================
const quizContainer = document.getElementById('quiz-container');
const quizQuestion = document.getElementById('quiz-question');
const quizOptions = document.querySelectorAll('.quiz-btn');
const quizFeedback = document.getElementById('quiz-feedback');

const quizData = [
    {
        question: "Qual prática reduz mais o consumo de água na agricultura?",
        options: ["Plantio convencional", "Irrigação inteligente", "Uso de fertilizantes químicos"],
        answer: "Irrigação inteligente"
    },
    {
        question: "Qual energia diminui impactos ambientais e custos?",
        options: ["Energia solar", "Energia a diesel", "Energia elétrica comum"],
        answer: "Energia solar"
    },
    {
        question: "Qual técnica ajuda a preservar o solo e biodiversidade?",
        options: ["Rotação de culturas", "Uso excessivo de fertilizantes", "Desmatamento"],
        answer: "Rotação de culturas"
    }
];

let currentQuiz = 0;

function loadQuiz() {
    const current = quizData[currentQuiz];
    quizQuestion.textContent = current.question;
    quizOptions.forEach((btn, index) => {
        btn.textContent = current.options[index];
        btn.disabled = false;
        btn.style.background = '#ff7043';
        btn.style.color = '#fff';
    });
    quizFeedback.textContent = '';
}

quizOptions.forEach(btn => {
    btn.addEventListener('click', () => {
        const selected = btn.textContent;
        const correct = quizData[currentQuiz].answer;
        if (selected === correct) {
            quizFeedback.textContent = "✅ Correto!";
            quizFeedback.style.color = 'green';
            btn.style.background = 'green';
        } else {
            quizFeedback.textContent = `❌ Errado! A resposta correta é "${correct}"`;
            quizFeedback.style.color = 'red';
            btn.style.background = 'red';
        }
        quizOptions.forEach(b => b.disabled = true);

        // Avança para próxima pergunta após 2 segundos
        setTimeout(() => {
            currentQuiz++;
            if(currentQuiz < quizData.length){
                loadQuiz();
            } else {
                quizQuestion.textContent = "🎉 Parabéns! Você completou o quiz!";
                document.querySelector('.quiz-options').style.display = 'none';
                quizFeedback.textContent = '';
            }
        }, 2000);
    });
});

// Inicializa quiz
loadQuiz();

       
