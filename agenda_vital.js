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
        let horario = this.setHorario()
        if (horario === undefined) return;

        let saturacao = this.setSaturacao()
        if (saturacao === undefined) return;

        let pressao = this.setPressao()
        if (pressao === undefined) return;

        let frequencia = this.setFrequencia()
        if (frequencia === undefined) return;

        let atividade = this.escolherAtividade();

        let sono = this.setsono(dia)
        if (sono === undefined) return;

        let sintomas = this.setSintomas()
        if (sintomas === undefined) return;

        let observacao = this.setObservacao()
        if (observacao === undefined) return;


        let registro = new RegistroVital(
            dia, horario, saturacao, pressao, frequencia,
            atividade, sono, sintomas, observacao
        );

        this.registros.push(registro);
        alert("Registro cadastrado!\n\n" + registro.mostrar());
    }
    setHorario() {
        let ok = false;
        let horario;

        while (!ok) {
            horario = prompt("Informe o horário (HH:MM):");
            if (horario === null) return undefined;

            horario = horario.replace(";", ":");
            let partesHorario = horario.split(":");
            if (partesHorario.length != 2 || partesHorario[0] === "" || partesHorario[1] === "") {
                alert("Horário inválido. Use HH:MM.");
            } else {
                let horas = Number(partesHorario[0]);
                let minutos = Number(partesHorario[1]);

                if (isNaN(horas) || isNaN(minutos) || horas < 0 || horas > 23 || minutos < 0 || minutos > 59 || horas % 1 !== 0 || minutos % 1 !== 0) {
                    alert("Horário inexistente. O horário deve ser entre 00:00 e 23:59.");
                } else {
                    ok = true;
                }
            }
        }
        return horario;
    }
    setSaturacao() {
        let ok = false;
        let saturacao;

        while (!ok) {
            let entrada = prompt("Informe a saturação (%):");
            if (entrada === null) return undefined;
            if (entrada === "") {
                alert("Saturação inválida.");
            } else {
                saturacao = Number(entrada);
                if (isNaN(saturacao) || saturacao < 0 || saturacao > 100 || saturacao % 1 !== 0) {
                    alert("Saturação inválida. Informe um número entre 0 e 100.");
                } else {
                    ok = true;
                }
            }
        }
        return saturacao;
    }

    setPressao() {
        let ok = false;
        let pressao;

        while (!ok) {
            pressao = prompt("Informe a pressão arterial (ex.: 120/80):");
            if (pressao === null) return undefined;
            if (pressao === "") {
                alert("Informe a pressão arterial.");
            } else {
                let valoresPressao = pressao.split("/");
                if (valoresPressao.length !== 2 || valoresPressao[0] === "" || valoresPressao[1] === "") {
                    alert("Formato de pressão inválido. Use a barra separadora (ex: 120/80).");
                } else {
                    let sistolica = Number(valoresPressao[0]);
                    let diastolica = Number(valoresPressao[1]);
                    if (isNaN(sistolica) || isNaN(diastolica) || diastolica >= sistolica) {
                        alert("Erro: A pressão diastólica (mínima) não pode ser maior ou igual à sistólica (máxima).");
                    } else {
                        ok = true;
                    }
                }
            }
        }
        return pressao;
    }

    setFrequencia() {
        let ok = false;
        let frequencia;

        while (!ok) {
            let entrada = prompt("Informe a frequência cardíaca (bpm):");
            if (entrada === null) return undefined;
            if (entrada === "") {
                alert("Frequência inválida.");
            } else {
                frequencia = Number(entrada);
                if (isNaN(frequencia) || frequencia <= 0) {
                    alert("Frequência inválida.");
                } else {
                    ok = true;
                }
            }
        }
        return frequencia;
    }

    setsono(dia) {
        let sono = null;
        let diaJaCadastrado = false;
        let horasSonoAnterior = 0;
        for (let i = 0; i < this.registros.length && !diaJaCadastrado; i++) {
            if (this.registros[i].dia === dia) {
                diaJaCadastrado = true;
                horasSonoAnterior = this.registros[i].sono;
            }
        }
        if (diaJaCadastrado) {
            sono = horasSonoAnterior;
            alert("Nota: Como você já possui registro em " + dia + ", o valor do sono (" + sono + "h) foi mantido automaticamente.");
        } else {
            let ok = false;
            while (!ok) {
                let entrada = prompt("Quantas horas dormiu?");
                if (entrada === null) return undefined;
                if (entrada === "") {
                    alert("Quantidade de horas de sono inválida.");
                } else {
                    sono = Number(entrada);
                    if (isNaN(sono) || sono < 0 || sono > 24) {
                        alert("Quantidade de horas de sono inválida. Deve ser um número entre 0 e 24.");
                    } else {
                        ok = true;
                    }
                }
            }
        }
        return sono;
    }
    setSintomas() {
        let sintomas = prompt("Apresentou algum sintoma?");
        if (sintomas === null) return undefined;
        if (sintomas === "") {
            sintomas = "Nenhum";
        }
        return sintomas;
    }
    setObservacao() {
        let observacao = prompt("Deseja adicionar alguma observação?");
        if (observacao === null) return undefined;
        if (observacao === "") {
            observacao = "Nenhuma";
        }
        return observacao;
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
    selecionarRegistro() {
        if (this.registros.length === 0) {
            alert("Nenhum registro encontrado");
            return;
        }
        let texto = "Registros Cadastrados\n\n";
        for (let i = 0; i < this.registros.length; i++) {
            texto += "[" + (i + 1) + "]" + this.registros[i].mostrar() + "\n------------------------\n";
        }
        let escolha = prompt(texto + "\nEscolha o número do registro");
        if (escolha === null || escolha === "") return;
        escolha = Number(escolha);
        if (isNaN(escolha) || escolha % 1 !== 0 || escolha < 1 || escolha > this.registros.length) {
            alert("Registro Inválido");
            return;
        }
        this.editarOUexcluir(escolha - 1);
    }

    editarOUexcluir(i) {
        let op = prompt("1 - Editar\n2 - Excluir");
        if (op == "1") {
            this.editarRegistro(i);
        } else if (op == "2") {
            this.registros.splice(i, 1);
            alert("Registro excluído!");
        }
    }

    editarRegistro(i) {
        let registro = this.registros[i];
        let op = prompt("O que deseja editar?\n\n" +
            "1 - Saturação\n" +
            "2 - Pressão Arterial\n" +
            "3 - Frequência Cardíaca\n" +
            "4 - Atividade\n" +
            "5 - Sono\n" +
            "6 - Sintomas\n" +
            "7 - Observação\n\n");
        let novoValor;

        if (op == "1") {
            novoValor = this.setSaturacao();
            if (novoValor === undefined) return;
            registro.saturacao = novoValor;
        } else if (op == "2") {
            novoValor = this.setPressao();
            if (novoValor === undefined) return;
            registro.pressao = novoValor;
        } else if (op == "3") {
            novoValor = this.setFrequencia();
            if (novoValor === undefined) return;
            registro.frequencia = novoValor;
        } else if (op == "4") {
            novoValor = this.escolherAtividade();
            if (novoValor === null) return;
            registro.atividade = novoValor;
        } else if (op == "5") {
            novoValor = this.setsono(registro.dia);
            if (novoValor === undefined) return;
            registro.sono = novoValor;
        } else if (op == "6") {
            novoValor = this.setSintomas();
            if (novoValor === undefined) return;
            registro.sintomas = novoValor;
        } else if (op == "7") {
            novoValor = this.setObservacao();
            if (novoValor === undefined) return;
            registro.observacao = novoValor;
        }
        alert("Registro atualizado!\n\n" + registro.mostrar());
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

        while (opcao != 7) {
            let resposta = prompt(
                "AGENDA VITAL\n\n" +
                "1 - Cadastrar novos sinais\n" +
                "2 - Consultar sinais cadastrados\n" +
                "3 - Gerar relatório semanal\n" +
                "4 - Ver cadastro pessoal\n" +
                "5 - Atualizar dados pessoais\n" +
                "6 - Atualizar ou Excluir cadastro de sinais\n" +
                "7 - Sair\n\n" +
                "Escolha uma opção:"
            );

            if (resposta === null || resposta === "") {
                opcao = 7;
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
                this.selecionarRegistro();
            } else if (opcao == 7) {
                alert("Encerrando a Agenda Vital. Cuide-se!");
            }
            else {
                alert("Opção inválida. Escolha entre 1 e 6.");
            }
        }
    }
}

let agenda = new AgendaVital();
agenda.iniciar();
