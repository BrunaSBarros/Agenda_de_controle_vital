class RegistroSinais {
    constructor(dia, saturacao, pressao, frequencia) {
        this.dia = dia;
        this.saturacao = saturacao;
        this.pressao = pressao;
        this.frequencia = frequencia;
    }

    mostrarSinais() {
        return "Saturação: " + this.saturacao + "%\n" +
            "Pressão: " + this.pressao + "\n" +
            "Frequência cardíaca: " + this.frequencia + " bpm";
    }
}

class RegistroVital {
    constructor(dia, saturacao, pressao, frequencia) {
        this.dia = dia;
        this.saturacao = saturacao;
        this.pressao = pressao;
        this.frequencia = frequencia;
        this.frequencia = frequencia;
        this.horario =  horario;
        this.atividade = atividade;
        this.sono = sono;
        this.sintomas = sintomas;
        this.observaçao = observaçao;
    }

    // Mostrar os dados já cadastrados
    mostrar() {
        return  "Dia: " + this.dia + "\n" +
        "Horário " + this.horario + "\n" +
        "Saturação: " + this.saturaçao + "\n" +
        "Pressão Arterial: " + this.pressao + "\n" +
        "Frequência Cardíaca: " + this.frequencia + "\n" +
        "Atividade: " + this.atividade + "\n" +
        "Sono: " + this.sono + "\n" +
        "Sintomas: " + this.sintomas + "\n" +
        "Observações: " + this.observaçao;
    }
}
class CadastroPessoal {
    constructor(idade, peso, altura) {
        this.idade = idade;
        this.peso = peso;
        this.altura = altura;
    }
    calcularIMC() {
        return  this.peso / (this.altura**2)
    }
    mostrarDados() {
        let texto = "Idade: " + this.idade + " anos\n" +
                    "Peso: " + this.peso + "\n" +
                    "Altura: " + this.altura + "\n" +
                    "IMC: " + this.calcularIMC().toFixed(2);

        if (this.idade < 20) {
            texto += "\nA interpretação do IMC para menores de 20 anos deve ser feita com base em referência de crescimento";
        } else {
            texto += "\nO IMC é apenas uma referência e não deve ser usado como único indicador de saúde. Consulte um profissional de saúde.";
        }

        return texto;
    }
}

class AgendaVital {
    constructor() {
        this.registros = [];
        this.cadastro = null;
        this.dias = [
            "Segunda-feira", "Terça-feira", "Quarta-feira",
            "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"
        ];
    }
     escolherDia() {
        let texto = "Escolha o dia da semana:\n";

        for (let i = 0; i < this.dias.length; i++) {
            texto += (i + 1) + " - " + this.dias[i] + "\n";
        }
         let escolha = prompt(texto);

        if (escolha == null || escolha == "") {
            return null;
        }

        escolha = Number(escolha);

        if (escolha < 1 || escolha > 7 || escolha % 1 != 0) {
            alert("Dia inválido.");
            return null;
        }

        return this.dias[escolha - 1];
    }

// Cadastrar Pessoa
    cadastrarPessoa() {
        let idade = parseInt(prompt('Qual a sua idade?'));

    if (isNaN(idade)) {
        alert('Cadastro cancelado');
        return;
    }

    if (idade < 1 || idade > 120) {
        alert('Cadastro cancelado');
        return;
    }

    let peso = parseFloat(prompt('Qual é o seu peso? em kg'));

    if (isNaN(peso) || peso <= 0) {
        alert('Peso Inválido');
        return;
    }

    let altura = Number(prompt("Qual a sua altura? em m"))
 
    if (altura <= 0 || isNaN(altura)) {
            alert("Altura inválida.");
            return;  
        }
        
        this.cadastro = new CadastroPessoal(idade, peso, altura);
            alert("Cadastro realizado!\n" + this.cadastro.mostrarDados());
   
}

mostrarCadastro() {
    if (this.cadastro == null) {
        alert("Nenhum cadastro pessoal foi realizado.");
        return;
    }

    alert(this.cadastro.mostrarDados());
}

    // Cadastro de registros
    cadastrar() {
        let escolha = Number(prompt(
            `Escolha o dia (1 a 7):
            1 - Segunda-feira
            2 - Terça-feira
            3 - Quarta-feira
            4 - Quinta-feira
            5 - Sexta-feira
            6 - Sábado
            7 - Domingo`
        ));

        if (escolha < 1 || escolha > 7){
            alert("Dia inválido. Por favor, escolha um dia entre 1 e 7.");
            return;
        }
        let nomeDia = this.dias[escolha - 1];

        let horario = Number(prompt("Qual horário do registro")) 
        if (horario == null || horario == ""){
            alert ("Cadastro cancelado")
            return
        }   

        let saturacao = Number(prompt("Saturação (%):"));
        if (saturaçao == null || saturaçao == ""){
            alert ("Cadastro cancelado")
            return
        }

        let pressao = prompt("Pressão Arterial (ex: 120/80):");
        if (pressao == null || pressao == ""){
            alert ("Cadastro cancelado")
            return
        }
        let frequencia = Number(prompt("Frequência Cardíaca (bpm):"));
        if (frequencia == null || frequencia == ""){
            alert ("Cadastro cancelado")
            return
        }

        let atividade = prompt ("Qual atividade estava realizando?");
        if (atividade == null || atividade == "") {
            alert("Cadastro cancelado.");
            return
        }

        let sono = Number("Quantas horas dormiu?")
            if (sonoTexto == null || sonoTexto == "") {
            alert("Cadastro cancelado.");
            return;
            }
            if (sono < 0 || sono > 24 || isNaN(sono)) {
                alert("Quantidade de sono inválida.");
                return;
            }

        let sintomas = prompt("Apresentou algum sintoma? Se não, digite nenhum")
        if (sintomas == null)
            return

        let observaçoes = prompt("Alguma observação adicional? Escreva aqui")
        if (observaçao == null)
           return

        this.registros.push(new RegistroVital(
            nomeDia, horario,  saturacao, pressao, frequencia, atividade, sono, sintomas, observaçoes
        ));

        alert("Registro salvo com sucesso!");
    }

    // Histórico de registros cadastrados
    historico() {
        if (this.registros.length == 0) {
            alert("Nenhum registro cadastrado.");
            return;
        }

        let texto = "--- HISTÓRICO ---\n";
        for (let i = 0; i < this.registros.length; i++) {
            texto += this.registros[i].mostrar();
        }
        alert(texto);
    }

    // Relatório semanal
    relatorio() {
        if (this.registros.length == 0) {
            alert("Nenhum registro encontrado para gerar relatório.");
            return;
        }

        let somaSaturaçao = 0;
        let somaFrequencia = 0;

        for (let i = 0; i < this.registros.length; i++) {
            somaSaturaçao += this.registros[i].saturacao;
            somaFrequencia += this.registros[i].frequencia;
        }

        let mediaSaturaçao = (somaSaturaçao / this.registros.length).toFixed(1);
        let mediaFrequencia = (somaFrequencia / this.registros.length).toFixed(1);

        alert(`RELATÓRIO SEMANAL
Total de registros: ${this.registros.length}
Média de saturação: ${mediaSaturaçao}%
Média cardíaca: ${mediaFrequencia} bpm`);
    }
}


let agenda = new AgendaVital();
let opcao = 0;

while (opcao != 6) {
    opcao = parseInt(prompt(
        `Agenda Vital - Sistema de Monitoramento
        1 - Cadastrar novos sinais
        2 - Consultar sinais já cadastrados
        3 - Gerar Relatório Semanal
        4 - Ver cadastro pessoal
        5-  Cadastrar/Atualizar dados pessoais
        6 - Sair do sistema
        Escolha uma opção:`
    ));

    if (opcao == 1) {
        agenda.cadastrar();
    } else if (opcao == 2) {
        agenda.historico();
    } else if (opcao == 3) {
        agenda.relatorio();
    } else if (opcao == 4) {
        agenda.mostrarDados()
    } else if (opcao == 5) {
        agenda.cadastarPessoa()
    } else if (opcao == 6) {
        alert("Encerrando a Agenda de Controle Vital.");
    } else if (opcao<1 || opcao>6){
        alert("Opção inválida. Escolha entre 1 e 6.");
    }
}
