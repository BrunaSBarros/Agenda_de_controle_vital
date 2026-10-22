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
        this.sono = this.sono;
        this.sintomas = sintomas;
        this.observaçao = observaçao;
    }

    // Mostrar os dados já cadastrados
    mostrar() {
        return  "Dia: " + this.dia + "\n" +
        "Horário " + this.horario + "\n" +
        "Saturação: " + this.saturação + "\n" +
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

        if (escolha === null || escolha === "") {
            return null;
        }

        escolha = Number(escolha);

        if (escolha < 1 || escolha > 7 || escolha % 1 !== 0) {
            alert("Dia inválido.");
            return null;
        }

        return this.dias[escolha - 1];
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
        let saturacao = Number(prompt("Saturação (%):"));
        let pressao = prompt("Pressão Arterial (ex: 120/80):");
        let frequencia = Number(prompt("Frequência Cardíaca (bpm):"));

        this.registros.push(new RegistroVital(
            nomeDia, saturacao, pressao, frequencia
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

while (opcao != 4) {
    opcao = parseInt(prompt(
        `Agenda Vital - Sistema de Monitoramento
        1 - Cadastrar novos sinais
        2 - Consultar sinais já cadastrados
        3 - Gerar Relatório Semanal
        4 - Sair do sistema
        Escolha uma opção:`
    ));

    if (opcao == 1) {
        agenda.cadastrar();
    } else if (opcao == 2) {
        agenda.historico();
    } else if (opcao == 3) {
        agenda.relatorio();
    } else if (opcao == 4) {
        alert("Encerrando a Agenda de Controle Vital.");
    } else if (opcao<1 || opcao>4){
        alert("Opção inválida. Escolha entre 1 e 4.");
    }
}
