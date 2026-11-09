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
            "Altura: " + this.altura + " cm";
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

        if (isNaN(escolha) || escolha % 1 !== 0 || escolha < 1 || escolha > 7) {
            alert("Dia inválido.");
            return null;
        }

        return this.dias[escolha - 1];
    }

    escolherAtividade() {
        let texto = "Selecione a atividade no momento do registro:\n" +
            "1 - Em Repouso\n" +
            "2 - Atividade Leve\n" +
            "3 - Atividade Moderada/Intensa";

        let escolha = prompt(texto);
        if (escolha === null || escolha == "") {
            return null;
        }

        escolha = Number(escolha);
        if (isNaN(escolha) || escolha < 1 || escolha > 3) {
            alert("Opção inválida. Definido como Repouso por padrão.");
            return "Em Repouso";
        }

        if (escolha == 2) return "Atividade Leve";
        if (escolha == 3) return "Atividade Moderada/Intensa";
        return "Em Repouso";
    }

    // Cadastrar Pessoa
    cadastrarPessoa() {
        let ok = false;
        let idade;
        while (!ok) {
            let entradaIdade = prompt("Informe sua idade:");
            if (entradaIdade === null) {
                return;
            }
            if (entradaIdade === "") {
                alert("Idade Inválida.");
            } else {
                idade = Number(entradaIdade);
                if (isNaN(idade) || idade < 0 || idade % 1 !== 0) {
                    alert("Idade Inválida.");
                } else {
                    ok = true;
                }
            }
        }

        ok = false;
        let peso;
        while (!ok) {
            let entradaPeso = prompt("Informe seu peso em kg:");
            if (entradaPeso === null) {
                return;
            }
            if (entradaPeso === "") {
                alert("Peso Inválido.");
            } else {
                peso = Number(entradaPeso);
                if (isNaN(peso) || peso < 0) {
                    alert("Peso Inválido.");
                } else {
                    ok = true;
                }
            }
        }

        ok = false;
        let altura;
        while (!ok) {
            let entradaAltura = prompt("Informe sua altura em cm:");
            if (entradaAltura === null) {
                return;
            }
            if (entradaAltura === "") {
                alert("Altura Inválida.");
            } else {
                altura = Number(entradaAltura);
                if (isNaN(altura) || altura < 0 || altura % 1 !== 0) {
                    alert("Altura Inválida.");
                } else {
                    ok = true;
                }
            }
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
        if (horario === null) return;

        horario = horario.replace(";", ":");
        let partesHorario = horario.split(":");
        if (partesHorario.length != 2) {
            alert("Horário inválido. Use HH:MM.\nCadastro Cancelado, realize novamente!");
            return;
        }

        let horas = Number(partesHorario[0]);
        let minutos = Number(partesHorario[1]);

        if (isNaN(horas) || isNaN(minutos) || horas < 0 || horas > 23 || minutos < 0 || minutos > 59 || horas % 1 !== 0 || minutos % 1 !== 0) {
            alert("Horário inexistente. O horário deve ser entre 00:00 e 23:59.\nCadastro Cancelado, realize novamente!");
            return;
        }

        let saturacao = Number(prompt("Informe a saturação (%):"));

        if (isNaN(saturacao) || saturacao < 0 || saturacao > 100 || saturacao % 1 !== 0) {
            alert("Saturação inválida.\nCadastro Cancelado, realize novamente!");
            return;
        }

        let pressao = prompt("Informe a pressão arterial (ex.: 120/80):");

        if (pressao === null || pressao === "") {
            alert("Informe a pressão arterial.\nCadastro Cancelado, realize novamente!");
            return;
        }

        let valoresPressao = pressao.split("/");
        if (valoresPressao.length !== 2) {
            alert("Formato de pressão inválido. Use a barra separadora (ex: 120/80).\nCadastro Cancelado, realize novamente!");
            return
        }
        let sistolica = Number(valoresPressao[0]);
        let diastolica = Number(valoresPressao[1]);
        if (diastolica >= sistolica) {
            alert("Erro: A pressão diastólica (mínima) não pode ser maior que a sistólica (máxima). \nCadastro Cancelado, realize novamente!")
            return
        }

        let frequencia = Number(prompt("Informe a frequência cardíaca (bpm):"));

        if (isNaN(frequencia) || frequencia <= 0) {
            alert("Frequência inválida.\nCadastro Cancelado, realize novamente!");
            return;
        }

        let atividade = this.escolherAtividade();
        if (atividade === null) return;

        let sono = null;
        let diaJaCadastrado = false;
        let horasSonoAnterior = 0;

        for (let i = 0; i < this.registros.length; i++) {
            if (this.registros[i].dia === dia) {
                diaJaCadastrado = true;
                horasSonoAnterior = this.registros[i].sono;
            }
        }

        if (diaJaCadastrado) {
            sono = horasSonoAnterior;
            alert("Nota: Como você já possui registro em " + dia + ", o valor do sono (" + sono + "h) foi mantido automaticamente.");
        } else {
            sono = Number(prompt("Quantas horas dormiu?"));
            if (sono === "" || isNaN(sono) || sono < 0 || sono > 24) {
                alert("Quantidade de horas de sono inválida. Deve ser um número entre 0 e 24.\nCadastro Cancelado, realize novamente!");
                return;
            }
        }

        let sintomas = prompt("Apresentou algum sintoma?");
        if (sintomas === null)
            return
        if (sintomas === "") {
            sintomas = "Nenhum"
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

                if (reg.dia == diaAtual) {
                    quantidade++;
                    somaSaturacao += reg.saturacao;
                    somaFrequencia += reg.frequencia;

                    // Saturação
                    let statusSat = "";

                    if (reg.saturacao >= 95) {
                        statusSat = "Dentro da referência usual";
                    } else if (reg.saturacao >= 93) {
                        statusSat = "Abaixo da referência usual";
                    } else {
                        statusSat = "Valor baixo; procure orientação";
                    }

                    // Pressão Arterial
                    let valores = reg.pressao.split("/");
                    let sistolica = Number(valores[0]);
                    let diastolica = Number(valores[1]);
                    let statusPressao = "";

                    if (sistolica < 90 || diastolica < 60) {
                        statusPressao = "HIPOTENSÃO";
                    } else if (sistolica >= 140 || diastolica >= 90) {
                        statusPressao = "HIPERTENSÃO";
                    } else if (sistolica >= 120 || diastolica >= 80) {
                        statusPressao = "PRÉ-HIPERTENSÃO";
                    } else {
                        statusPressao = "Pressão Arterial NORMAL";
                    }


                    // Frequência Cardíaca
                    let idade = this.cadastro.idade;
                    let minimo = 60;
                    let maximo = 100;

                    if (idade <= 5) {
                        minimo = 80;
                        maximo = 160;
                    } else if (idade <= 17) {
                        minimo = 60;
                        maximo = 120;
                    } else if (idade < 60) {
                        minimo = 60;
                        maximo = 100;
                    } else {
                        minimo = 60;
                        maximo = 100;
                    }

                    if (reg.atividade == "Atividade Leve") {
                        maximo += 15;
                    } else if (reg.atividade == "Atividade Moderada/Intensa") {
                        maximo += 30;
                    }

                    let statusFreq = "";
                    if (reg.frequencia < minimo) {
                        statusFreq = "Abaixo da referência usual";
                    } else if (reg.frequencia > maximo) {
                        statusFreq = "Acima da referência usual (Máx. esperado para a atividade: " + maximo + " bpm)";
                    } else {
                        statusFreq = "Dentro da referência usual";
                    }

                    let statusSono = "";

                    if (reg.sono < 7) {
                        statusSono = "Abaixo do recomendado";
                    } else {
                        statusSono = "Quantidade adequada";
                    }

                    textoDiario +=
                        "\nHorário: " + reg.horario + "\n" +
                        "Saturação: " + reg.saturacao + "% (" + statusSat + ")\n" +
                        "Pressão arterial: " + reg.pressao + " (" + statusPressao + ")\n" +
                        "Frequência cardíaca: " + reg.frequencia + " bpm (" + statusFreq + ")\n" +
                        "Atividade: " + reg.atividade + "\n" +
                        "Sono: " + reg.sono + " horas (" + statusSono + ")\n" +
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
            "            AGENDA VITAL\n" +
            "    Sistema de Monitoramento\n" +
            "================================\n" +
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