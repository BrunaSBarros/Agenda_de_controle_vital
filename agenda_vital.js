class RegistroVital {
    constructor(dia, horario, saturacao, pressao, frequencia, atividade, sono, sintomas, observacao) {
        this.dia = dia;
        this.horario = horario;
        this.saturacao = saturacao;
        this.pressao = pressao;
        this.frequencia = frequencia;
        this.atividade = atividade;
        this.sono = sono;
        this.sintomas = sintomas;
        this.observacao = observacao;
    }

    // Mostrar os dados já cadastrados
    mostrar() {
        return this.dia + " (" + this.horario + ")\n" +
            "Saturação: " + this.saturacao + "%\n" +
            "Pressão: " + this.pressao + "\n" +
            "Frequência: " + this.frequencia + " bpm\n" +
            "Atividade: " + this.atividade + "\n" +
            "Sono: " + this.sono + " horas\n" +
            "Sintomas: " + this.sintomas + "\n" +
            "Observação: " + this.observacao;
    }
}

class CadastroPessoal {
    constructor(idade, peso, altura) {
        this.idade = idade;
        this.peso = peso;
        this.altura = altura;
    }

    mostrarDados() {
        return "Idade: " + this.idade + " anos\n" +
            "Peso: " + this.peso + " kg\n" +
            "Altura: " + this.altura + " m";
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
        let texto = "Escolha o dia:\n";

        for (let i = 0; i < this.dias.length; i++) {
            texto += (i + 1) + " - " + this.dias[i] + "\n";
        }

        let escolha = prompt(texto);

        if (escolha === null || escolha === "") {
            return null;
        }

        escolha = Number(escolha);

        if (isNaN(escolha) || escolha < 1 || escolha > 7) {
            alert("Dia inválido.");
            return null;
        }

        return this.dias[escolha - 1];
    }

    // Cadastrar Pessoa
    cadastrarPessoa() {
        let idade = Number(prompt("Informe sua idade:"));
        let peso = Number(prompt("Informe seu peso em kg:"));
        let altura = Number(prompt("Informe sua altura em metros:"));

        if (isNaN(idade) || idade < 0 ||
            isNaN(peso) || peso <= 0 ||
            isNaN(altura) || altura <= 0) {
            alert("Dados inválidos.");
            return;
        }

        this.cadastro = new CadastroPessoal(idade, peso, altura);
        alert("Cadastro realizado!\n\n" + this.cadastro.mostrarDados());
    }

    mostrarCadastro() {
        if (this.cadastro === null) {
            alert("Nenhum cadastro pessoal encontrado.");
        } else {
            alert("CADASTRO PESSOAL\n\n" + this.cadastro.mostrarDados());
        }
    }

    // Cadastro de registros
    cadastrar() {
        if (this.cadastro === null) {
            alert("Faça o cadastro pessoal primeiro.");
            return;
        }

        let dia = this.escolherDia();

        if (dia === null) {
            return;
        }

        let horario = prompt("Informe o horário (HH:MM):");

        if (horario === null) {
            return;
        }

        let partesHorario = horario.split(":");

        if (partesHorario.length != 2 ||
            isNaN(partesHorario[0]) || isNaN(partesHorario[1])) {
            alert("Horário inválido. Use HH:MM.");
            return;
        }

        let saturacao = Number(prompt("Informe a saturação (%):"));

        if (isNaN(saturacao) || saturacao < 0 || saturacao > 100) {
            alert("Saturação inválida.");
            return;
        }

        let pressao = prompt("Informe a pressão arterial (ex.: 120/80):");

        if (pressao === null || pressao === "") {
            alert("Informe a pressão arterial.");
            return;
        }

        let frequencia = Number(prompt("Informe a frequência cardíaca (bpm):"));

        if (isNaN(frequencia) || frequencia <= 0) {
            alert("Frequência inválida.");
            return;
        }

        let atividade = prompt("Qual atividade estava realizando?");
        let sono = Number(prompt("Quantas horas dormiu?"));
        let sintomas = prompt("Apresentou algum sintoma?");

        if (atividade === null || sintomas === null) {
            return;
        }

        if (isNaN(sono) || sono < 0 || sono > 24) {
            alert("Quantidade de horas de sono inválida.");
            return;
        }

        let observacao = prompt("Deseja adicionar alguma observação?");

        if (observacao === null || observacao === "") {
            observacao = "Nenhuma";
        }

        let registro = new RegistroVital(
            dia, horario, saturacao, pressao, frequencia,
            atividade, sono, sintomas, observacao
        );

        this.registros.push(registro);
        alert("Registro cadastrado!\n\n" + registro.mostrar());
    }

    // Histórico de registros cadastrados
    historico() {
        if (this.registros.length === 0) {
            alert("Nenhum registro cadastrado.");
            return;
        }

        let texto = "HISTÓRICO DE SINAIS VITAIS\n\n";

        for (let i = 0; i < this.registros.length; i++) {
            texto += this.registros[i].mostrar() +
                "\n-------------------------\n";
        }

        alert(texto);
    }

    // Relatório semanal com analisador por dia
    relatorio() {
        if (this.registros.length === 0) {
            alert("Não há registros para gerar o relatório.");
            return;
        }

        let texto = "RELATÓRIO DE SINAIS VITAIS\n";
        texto += "Idade: " + this.cadastro.idade + " anos\n\n";

        for (let i = 0; i < this.dias.length; i++) {
            let diaAtual = this.dias[i];
            let quantidade = 0;
            let somaSaturacao = 0;
            let somaFrequencia = 0;
            let textoDiario = "";

            for (let j = 0; j < this.registros.length; j++) {
                let reg = this.registros[j];

                if (reg.dia === diaAtual) {
                    quantidade++;
                    somaSaturacao += reg.saturacao;
                    somaFrequencia += reg.frequencia;

                    let statusSat = "";

                    if (reg.saturacao >= 95) {
                        statusSat = "Dentro da referência usual";
                    } else if (reg.saturacao >= 93) {
                        statusSat = "Abaixo da referência usual";
                    } else {
                        statusSat = "Valor baixo; procure orientação";
                    }

                    textoDiario +=
                        "\nHorário: " + reg.horario + "\n" +
                        "Saturação: " + reg.saturacao + "% (" + statusSat + ")\n" +
                        "Pressão arterial: " + reg.pressao + "\n" +
                        "Frequência cardíaca: " + reg.frequencia + " bpm\n" +
                        "Atividade: " + reg.atividade + "\n" +
                        "Sono: " + reg.sono + " horas\n" +
                        "Sintomas: " + reg.sintomas + "\n" +
                        "Observação: " + reg.observacao + "\n";
                }
            }

            if (quantidade > 0) {
                texto += "\n" + diaAtual + "\n" + textoDiario;
                texto += "Média de saturação: " +
                    (somaSaturacao / quantidade).toFixed(1) + "%\n";
                texto += "Média de frequência cardíaca: " +
                    (somaFrequencia / quantidade).toFixed(1) + " bpm\n";
                texto += "-------------------------\n";
            }
        }

        alert(texto);
    }

    iniciar() {
        // Inicialização do sistema
        alert(
            "================================\n" +
            "          AGENDA VITAL\n" +
            "   Sistema de Monitoramento\n" +
            "================================\n\n" +
            "Bem-vindo(a) à Agenda Vital!\n\n" +
            "Registre seus sinais vitais,\n" +
            "acompanhe seu histórico e\n" +
            "organize suas informações.\n\n" +
            "Vamos começar pelo cadastro pessoal!"
        );

        this.cadastrarPessoa();

        let opcao = 0;

        while (opcao != 6) {
            let resposta = prompt(
                "AGENDA VITAL\n\n" +
                "1 - Cadastrar novos sinais\n" +
                "2 - Consultar sinais cadastrados\n" +
                "3 - Gerar relatório semanal\n" +
                "4 - Ver cadastro pessoal\n" +
                "5 - Atualizar dados pessoais\n" +
                "6 - Sair\n\n" +
                "Escolha uma opção:"
            );

            if (resposta === null || resposta === "") {
                opcao = 6;
            } else {
                opcao = Number(resposta);
            }

            if (opcao == 1) {
                this.cadastrar();
            } else if (opcao == 2) {
                this.historico();
            } else if (opcao == 3) {
                this.relatorio();
            } else if (opcao == 4) {
                this.mostrarCadastro();
            } else if (opcao == 5) {
                this.cadastrarPessoa();
            } else if (opcao == 6) {
                alert("Encerrando a Agenda Vital. Cuide-se!");
            } else {
                alert("Opção inválida. Escolha entre 1 e 6.");
            }
        }
    }
}

let agenda = new AgendaVital();
agenda.iniciar();