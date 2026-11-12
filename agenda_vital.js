
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
        this.diaAtual = null;
        this.indiceEdicao = null;
        this.dias = ["Segunda-feira", "Terça-feira", "Quarta-feira",
            "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];
    }

    escolherDia() {
        let texto = "Escolha o dia:\n";
        for (let i = 0; i < this.dias.length; i++) {
            texto += (i + 1) + " - " + this.dias[i] + "\n";
        }

        let escolha = prompt(texto);
        if (escolha === null || escolha === "") return null;

        escolha = Number(escolha);
        if (isNaN(escolha) || escolha % 1 !== 0 || escolha < 1 || escolha > 7) {
            alert("Dia inválido.");
            return null;
        }
        return this.dias[escolha - 1];
    }

    escolherAtividade() {
        let texto = "Selecione a atividade no momento do registro:\n" +
            "1 - Em Repouso\n2 - Atividade Leve\n3 - Atividade Moderada/Intensa";
        let escolha = prompt(texto);
        if (escolha === null || escolha === "") return null;

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
            if (entradaIdade === null) return;

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
            if (entradaPeso === null) return;

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
            if (entradaAltura === null) return;

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
        if (dia === null) return;

        this.diaAtual = dia;
        this.indiceEdicao = null;

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

        if (isNaN(horas) || isNaN(minutos) || horas < 0 ||
            horas > 23 || minutos < 0 || minutos > 59 ||
            horas % 1 !== 0 || minutos % 1 !== 0) {
            alert("Horário inexistente. O horário deve ser entre 00:00 e 23:59.\nCadastro Cancelado, realize novamente!");
            return;
        }

        let saturacao = this.setSaturacao();
        if (saturacao === undefined) return;
        let pressao = this.setPressao();
        if (pressao === undefined) return;
        let frequencia = this.setFrequencia();
        if (frequencia === undefined) return;
        let atividade = this.escolherAtividade();
        if (atividade === null) return;
        let sono = this.setsono();
        if (sono === undefined) return;
        let sintomas = this.setSintomas();
        if (sintomas === undefined) return;
        let observacao = this.setObservacao();
        if (observacao === undefined) return;

        let registro = new RegistroVital(dia, horario, saturacao, pressao,
            frequencia, atividade, sono, sintomas, observacao);
        this.registros.push(registro);
        alert("Registro cadastrado!\n\n" + registro.mostrar());
    }

    // Cadastro de saturação
    setSaturacao() {
        let entrada = prompt("Informe a saturação (%):");
        if (entrada === null) return undefined;

        let saturacao = Number(entrada);
        if (entrada === "" || isNaN(saturacao) ||
            saturacao < 0 || saturacao > 100 || saturacao % 1 !== 0) {
            alert("Saturação inválida.\nCadastro Cancelado, realize novamente!");
            return undefined;
        }
        return saturacao;
    }

    // Cadastro de pressão arterial
    setPressao() {
        let pressao = prompt("Informe a pressão arterial (ex.: 120/80):");
        if (pressao === null || pressao === "") {
            alert("Informe a pressão arterial.\nCadastro Cancelado, realize novamente!");
            return undefined;
        }

        let valoresPressao = pressao.split("/");
        if (valoresPressao.length !== 2) {
            alert("Formato de pressão inválido. Use a barra separadora (ex: 120/80).\nCadastro Cancelado, realize novamente!");
            return undefined;
        }

        let sistolica = Number(valoresPressao[0]);
        let diastolica = Number(valoresPressao[1]);
        if (valoresPressao[0] === "" || valoresPressao[1] === "" ||
            isNaN(sistolica) || isNaN(diastolica) || diastolica >= sistolica) {
            alert("Erro: A pressão diastólica (mínima) não pode ser maior que a sistólica (máxima).\nCadastro Cancelado, realize novamente!");
            return undefined;
        }
        return pressao;
    }

    // Cadastro de frequência cardíaca
    setFrequencia() {
        let entrada = prompt("Informe a frequência cardíaca (bpm):");
        if (entrada === null) return undefined;

        let frequencia = Number(entrada);
        if (entrada === "" || isNaN(frequencia) || frequencia <= 0) {
            alert("Frequência inválida.\nCadastro Cancelado, realize novamente!");
            return undefined;
        }
        return frequencia;
    }

    // Cadastro de horas de sono
    setsono() {
        let sono = null;
        let diaJaCadastrado = false;
        let horasSonoAnterior = 0;

        for (let i = 0; i < this.registros.length; i++) {
            if (this.registros[i].dia === this.diaAtual && i !== this.indiceEdicao) {
                diaJaCadastrado = true;
                horasSonoAnterior = this.registros[i].sono;
            }
        }

        if (diaJaCadastrado) {
            sono = horasSonoAnterior;
            alert("Nota: Como você já possui registro em " + this.diaAtual +
                ", o valor do sono (" + sono + "h) foi mantido automaticamente.");
        } else {
            let entrada = prompt("Quantas horas dormiu?");
            if (entrada === null) return undefined;

            sono = Number(entrada);
            if (entrada === "" || isNaN(sono) || sono < 0 || sono > 24) {
                alert("Quantidade de horas de sono inválida. Deve ser um número entre 0 e 24.\nCadastro Cancelado, realize novamente!");
                return undefined;
            }
        }
        return sono;
    }

    // Cadastro de sintomas
    setSintomas() {
        let sintomas = prompt("Apresentou algum sintoma?");
        if (sintomas === null) return undefined;
        if (sintomas === "") sintomas = "Nenhum";
        return sintomas;
    }

    // Cadastro de observação
    setObservacao() {
        let observacao = prompt("Deseja adicionar alguma observação?");
        if (observacao === null) return undefined;
        if (observacao === "") observacao = "Nenhuma";
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
            texto += "[" + (i + 1) + "] " + this.registros[i].mostrar() +
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

                    textoDiario += "\nHorário: " + reg.horario + "\n" +
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

    // Selecionar registro para editar ou excluir
    selecionarRegistro() {
        if (this.registros.length === 0) {
            alert("Nenhum registro cadastrado.");
            return;
        }

        let texto = "REGISTROS CADASTRADOS\n\n";
        for (let i = 0; i < this.registros.length; i++) {
            texto += "[" + (i + 1) + "] " + this.registros[i].mostrar() +
                "\n-------------------------\n";
        }

        let escolha = prompt(texto + "\nEscolha o número do registro:");
        if (escolha === null || escolha === "") return;

        escolha = Number(escolha);
        if (isNaN(escolha) || escolha % 1 !== 0 ||
            escolha < 1 || escolha > this.registros.length) {
            alert("Registro inválido.");
            return;
        }
        this.editarOUexcluir(escolha - 1);
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
            } else {
                alert("Opção inválida. Escolha entre 1 e 7.");
            }
        }
    }
}

let agenda = new AgendaVital();
agenda.iniciar();
