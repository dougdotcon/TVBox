# TVBoxClusterMonitor

**Reaproveitar • Orquestrar • Escalar**

O **TVBoxClusterMonitor** é uma solução completa de monitoramento projetada para clusters de Android TV Boxes reutilizados. Iniciado como um projeto de pesquisa e evoluindo para um sistema full-stack, o objetivo é extrair o máximo valor de hardware descartado implementando as melhores práticas de infraestrutura moderna. A solução fornece visibilidade em tempo real, descoberta automatizada e uma base para computação distribuída escalável usando dispositivos de borda de baixo custo.

## Recursos Principais

- **Monitoramento de Recursos em Tempo Real**: Acompanhamento ao vivo de uso de CPU, consumo de memória e saúde do sistema.
- **Dashboard Interativo**: UI responsiva e limpa com tema escuro, incluindo gráficos detalhados e visualização de métricas.
- **Descoberta Automática**: Detecção automática de TV Boxes na rede local.
- **Detalhes e Insights**: Visões modais para status individual de dispositivos, histórico de recursos e métricas de performance.
- **Arquitetura Escalável**: Construído com Node.js, React e Docker para facilitar implantação e futura expansão.

## Visão Geral do Dashboard

<p align="center">
  <img src="frontend/screenshots/dashboard.png" alt="Dashboard Principal" width="45%" style="display:inline-block; margin-right:10px;"/>
  <img src="frontend/screenshots/modal-tvbox.png" alt="Modal Detalhes TVBox" width="45%" style="display:inline-block;"/>
</p>

## Stack Tecnológica

- **Backend**: Node.js, Express, Socket.IO
- **Frontend**: React, Vite, Recharts, TailwindCSS
- **Infraestrutura**: Docker, systemd

## Roadmap e Melhorias Futuras

- **Orquestração Avançada**: Integração com Kubernetes para gerenciamento de containers.
- **Arquitetura de Microserviços**: Desacoplamento de serviços para maior escalabilidade e resiliência.
- **Escalabilidade Horizontal Dinâmica**: Automação de escala baseada em métricas de carga.
- **Observabilidade Aprimorada**: Detalhes de I/O de rede, disco e armazenamento.
- **Computação de Borda Distribuída**: Framework para implantação e gerenciamento de cargas de trabalho em edge.

## Casos de Uso e Potencial de Inovação

O TVBoxClusterMonitor transforma hardware obsoleto em um cluster de computação viável, ideal para diversas aplicações inovadoras:

### 1. Computação Distribuída de Baixo Custo
- **Processamento paralelo** para tarefas insensíveis a latência (ex: processamento em lote de dados).
- **Computação em cluster** para simulações e cálculos em larga escala.
- **Computação de Borda** descentralizada para IoT e processamento local de dados.
- **Backup distribuído** e sistemas de redundância de dados.

### 2. Pesquisa e Educação
- **Ambientes de aprendizado** para conceitos de sistemas distribuídos e gerenciamento de clusters.
- **Bancos de testes** para desenvolvimento de algoritmos (balanceamento de carga, orquestração de containers).
- **Simulação de infraestrutura** para cenários complexos com restrições de recursos.

### 3. Infraestrutura de Microserviços
- **Containerização leve** para hospedagem de microserviços.
- **Gateways de API** distribuídos e balanceadores de carga.
- **Clusters de Cache** (ex: Redis) e armazenamento de sessão distribuído.

### 4. Monitoramento e Observabilidade
- **Coleta de métricas** em tempo real e agregação.
- **Alertas proativos** baseados em limites configuráveis.
- **Análise histórica** de performance para identificação de tendências.

## Resultados Esperados e Métricas

### Benefícios Imediatos
- **Redução de Custos**: Economia de até 80% comparado ao hardware tradicional.
- **Sustentabilidade**: Promove reutilização de hardware e reduz resíduos eletrônicos.
- **Visibilidade Completa**: Dashboard centralizado para todos os recursos do cluster.
- **Escalabilidade Dinâmica**: Adição ou remoção de nós sob demanda.
- **Alta Disponibilidade**: Redundância através de múltiplos dispositivos.

### Metas de Performance
yaml
Monitoramento:
  - Latência de Coleta: < 250ms
  - Frequência de Atualização: 3s
  - Uptime Esperado: > 99.5%
  - Capacidade de Dispositivos: 50+ TVBoxes

Especificações Típicas por TVBox:
  - CPU: 1-4 núcleos ARM
  - RAM: 1-4GB
  - Armazenamento: 8-32GB
  - Rede: 100Mbps-1Gbps


## Começando

Para iniciar com o TVBoxClusterMonitor, consulte as instruções específicas de configuração no arquivo `docker-compose.yml` e nos arquivos de ambiente localizados no repositório do projeto.

### Pré-requisitos
- Docker & Docker Compose
- Node.js (para ambiente de desenvolvimento)
- TV Boxes com acesso SSH habilitado

## Contribuindo

Contribuições são bem-vindas! Por favor, leia nosso `CONTRIBUTING.md` para detalhes sobre nosso código de conduta e o processo de envio de pull requests.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo `LICENSE` para detalhes.

---

*TVBoxClusterMonitor - Transformando hardware descartado em recursos de computação poderosos.*
