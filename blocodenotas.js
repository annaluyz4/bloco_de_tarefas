// pegar os elementos do HTML

const campoTarefa = document.getElementById("tarefa");

const botaoAdicionar = document.getElementById("adicionar");

const listaTarefas = document.getElementById("lista-tarefas");


// funcao que adiciona a tarefa

let tarefas = [];

function adicionarTarefa() {

    const texto = campoTarefa.value;

    if (texto === "") {
        return;
    }

    tarefas.push({
        nome: texto,
        marcada: false
    });

    mostrarTarefas();
    campoTarefa.value = "";
}


// botão para chamar a função tarefa

botaoAdicionar.addEventListener("click", adicionarTarefa);


// mostrar as tarefas adicionadas

function mostrarTarefas() {

    listaTarefas.innerHTML = "";

    for (let i = 0; i < tarefas.length; i++) {

        if (i % 4 === 0){
            bloco = document.createElement("div");

            bloco.classList.add("bloco");

            //titulo do 2 bloco
            bloco.innerHTML = `
                <button class="fechar-janela" onclick="excluirTarefa(${i})">X</button>
                <h2>Bloco ${Math.floor(i / 4) + 1}</h2> 
            `;

            listaTarefas.appendChild(bloco);
        }

        const tarefaDiv = document.createElement("div");

        tarefaDiv.classList.add("tarefas");

        tarefaDiv.innerHTML = `
            <input type="checkbox"
                ${tarefas[i].marcada ? "checked" : ""}
                onchange="atualizarStatus(${i})">
            <span>${tarefas[i].nome}</span>
            <button onclick="editarTarefa(${i})">✏️</button>
        `;

        bloco.appendChild(tarefaDiv);
    }
}
function excluirTarefa(index) {
    tarefas.splice(index, 1); // Remove a tarefa do array
    mostrarTarefas();         // Atualiza o visual da tela
}


// Atualizar o status do checkbox
function atualizarStatus(index) {
    tarefas[index].marcada = !tarefas[index].marcada;
}

function atualizarStatus(index) {
    tarefas[index].marcada = !tarefas[index].marcada;
}
// Função simples para editar a tarefa
function editarTarefa(index) {
    const novoTexto = prompt("Editar tarefa:", tarefas[index].nome);
    if (novoTexto !== null && novoTexto.trim() !== "") {
        tarefas[index].nome = novoTexto.trim();
        mostrarTarefas();
    }
}