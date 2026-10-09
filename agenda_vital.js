class RegistroSinais {
    constructor(data, saturacao, pressao, frequencia) {
        this.data = data;
        this.saturacao = saturacao;
        this.pressao = pressao;
        this.frequencia = frequencia;
    }
}
let ArmazenarSinais = [];
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
        let data = prompt("Digite o dia ou data do registro (ex: Segunda, 10/10):");
        let medidaS = prompt("Digite a medida de saturação (%):");
        let medidaP = prompt("Digite a medida de pressão arterial (ex: 12/8):");
        let medidaF = prompt("Digite a medida de frequência cardíaca (BPM):");
    }

if (opcao == 2) {
    if (ArmazenarSinais.length == 0) {
        alert("Nenhum registro encontrado.");
    } else {
            let histórico = "--- Sinais Registrados ---";

            for (let i = 0; i < ArmazenarSinais.length; i++) {
                let registro = ArmazenarSinais[i];
                histórico += `${i + 1} Data/Hora: ${registro.data}
                             Saturação: ${registro.saturacao}% 
                             Pressão: ${registro.pressao}
                             Frequência: ${registro.frequencia} BPM;`
                            }
            }      
                }   
      if (opcao == 3) {  

                    }     