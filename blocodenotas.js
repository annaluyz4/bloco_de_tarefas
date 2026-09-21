
const campoTarefa = document.getElementById("tarefa");

const botaoAdicionar = document.getElementById("adicionar");

const listaTarefas = document.getElementById("lista-tarefas");


//armazenar tarefa
let tarefas = [];


// adicionar tarefa
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
    mostrarTarefas();


    // Limpa o campo
    campoTarefa.value = "";
}



// adicionar tarefa

botaoAdicionar.addEventListener("click", adicionarTarefa);



// mostrar tarefas


function mostrarTarefas() {

    // Limpar a tela 
    listaTarefas.innerHTML = "";
    let bloco = null;

    for (let i = 0; i < tarefas.length; i++) {


        // a cada 4 tarefas, criar um novo blo

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


      
        // cria a tarefa
       

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

        mostrarTarefas();

    }

}
