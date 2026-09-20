// Pegar os elementos do HTML
const campoTarefa = document.getElementById("tarefa");
const botaoAdicionar = document.getElementById("adicionar");
const listaTarefas = document.getElementById("lista-tarefas");

let tarefas = [];

// Função que adiciona a tarefa
function adicionarTarefa() {
    const texto = campoTarefa.value.trim();

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

// Botão para chamar a função tarefa
botaoAdicionar.addEventListener("click", adicionarTarefa);

// Mostrar as tarefas adicionadas
function mostrarTarefas() {
    listaTarefas.innerHTML = "";
    let bloco = null; // Declarado corretamente para evitar o travamento

    for (let i = 0; i < tarefas.length; i++) {
        // Cria um novo bloco a cada 4 tarefas
        if (i % 4 === 0) {
            bloco = document.createElement("div");
            bloco.classList.add("bloco");

            bloco.innerHTML = `
                <button class="fechar-janela" onclick="excluirBloco(${i})">X</button>
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

        if (bloco) {
            bloco.appendChild(tarefaDiv);
        }
    }
}

// Excluir bloco ou tarefa
function excluirBloco(index) {
    // Remove o bloco de 4 tarefas correspondente
    tarefas.splice(index, 4); 
    mostrarTarefas();         
}

// Atualizar o status do checkbox
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
