// ============================================
// PEGAR OS ELEMENTOS DO HTML
// ============================================
let myArchives = JSON.parse(localStorage.getItem("bloco_de_tarefas")) || [];
var idNovo = 1;

function SaveLocalStorage() {
    localStorage.setItem("bloco_de_tarefas", JSON.stringify(myArchives));

}
let tarefas = myArchives;

const campoTarefa = document.getElementById("tarefa");

const botaoAdicionar = document.getElementById("adicionar");

const listaTarefas = document.getElementById("lista-tarefas");


// ============================================
// ARRAY QUE VAI ARMAZENAR AS TAREFAS
// ============================================

let tarefas = [];


// ============================================
// FUNÇÃO QUE ADICIONA A TAREFA
// ============================================

function adicionarTarefa() {

    const texto = campoTarefa.value.trim();

    // Não deixa adicionar tarefa vazia
    if (texto === "") {
        return;
    }


    // Adiciona a tarefa no Array
    tarefas.push({

        nome: texto,

        marcada: false

    });


    // Mostra novamente as tarefas
    SaveLocalStorage();
    mostrarTarefas();


    // Limpa o campo
    campoTarefa.value = "";
}


// ============================================
// BOTÃO PARA ADICIONAR A TAREFA
// ============================================

botaoAdicionar.addEventListener("click", adicionarTarefa);


// ============================================
// MOSTRAR AS TAREFAS
// ============================================

function mostrarTarefas() {

    // Limpa a tela antes de montar novamente
    listaTarefas.innerHTML = "";


    // Variável que vai guardar o bloco atual
    let bloco = null;


    // Percorre todas as tarefas do Array
    for (let i = 0; i < tarefas.length; i++) {


        // ====================================
        // CRIA UM NOVO BLOCO A CADA 4 TAREFAS
        // ====================================

        if (i % 4 === 0) {

            bloco = document.createElement("div");

            bloco.classList.add("bloco");


            // Botão para excluir o bloco
            bloco.innerHTML = `
                <button 
                    class="fechar-janela"
                    onclick="excluirBloco(${i})"
                >
                    X
                </button>
            `;


            // Coloca o bloco dentro da lista
            listaTarefas.appendChild(bloco);
        }


        // ====================================
        // CRIA A TAREFA
        // ====================================

        const tarefaDiv = document.createElement("div");

        tarefaDiv.classList.add("tarefas");


        tarefaDiv.innerHTML = `
            
            <input 
                type="checkbox"
                ${tarefas[i].marcada ? "checked" : ""}
                onchange="atualizarStatus(${i})"
            >

            <span>
                ${tarefas[i].nome}
            </span>

            <button 
                class="botao-editar"
                onclick="editarTarefa(${i})"
            >
                ✏️
            </button>

        `;


        // Coloca a tarefa dentro do bloco atual
        if (bloco) {

            bloco.appendChild(tarefaDiv);

        }

    }
}


// ============================================
// EXCLUIR BLOCO
// ============================================

function excluirBloco(index) {

    // Remove 4 tarefas começando pelo índice informado
    tarefas.splice(index, 4);

    // Mostra novamente as tarefas
    SaveLocalStorage();
    mostrarTarefas();
}


// ============================================
// ATUALIZAR CHECKBOX
// ============================================

function atualizarStatus(index) {

    tarefas[index].marcada = !tarefas[index].marcada;

}


// ============================================
// EDITAR TAREFA
// ============================================

function editarTarefa(index) {

    const novoTexto = prompt(
        "Editar tarefa:",
        tarefas[index].nome
    );


    if (
        novoTexto !== null &&
        novoTexto.trim() !== ""
    ) {

        tarefas[index].nome = novoTexto.trim();
        SaveLocalStorage();
        mostrarTarefas();

    }

}
