<template>
  <v-container max-width="1000px">
    <h2>Política de privacidade</h2>

    <p>
      Este documento tem como objetivo informar a todos os usuários sobre como é realizado o processamento de seus dados, quais informações são armazenadas, qual o objetivo do armazenamento, como é garantida a segurança dos dados, etc.
    </p>

    <section>
      <h3>
        Quais informações são armazenadas pela plataforma?
      </h3>

      <p>
        Para permitir a autenticação e reconhecimento dos usuários e suas respectivas contas, precisamos salvar algumas informações pessoais como: nome, e-mail, senha, foto de perfil e data e horário de login.
      </p>

      <p>
        Internamente, geramos também algumas informações adicionais para permitir uma interação melhor com a plataforma, como as informações sobre conquistas concluídas e em progresso.
      </p>

      <p>
        Além disso, como a plataforma possui a finalidade de gerenciar despesas e valores recebidos, salvamos as informações das despesas enviadas pelo usuário para poder proporcionar essa função. Entretanto, até o momento, não compartilhamos essas informações com instituições financeiras, elas servem apenas para que os usuários possam consultar seus próprios registros, analisar suas próprias atividades e, assim, possuir um melhor controle sobre as suas finanças ao longo do tempo.
      </p>
    </section>

    <section>
      <h3>
        Como essas informações são processadas?
      </h3>

      <p>
        Ao receber as informações enviadas pelos usuários, armazenamos os dados que precisamos para o funcionamento correto da plataforma em nosso banco de dados e, posteriormente, as consultamos quando necessário.
      </p>

      <p>
        Além de salvar em nosso banco de dados, também salvamos algumas informações mais simples diretamente no navegador do usuário, como preferências de temas, por exemplo.
      </p>

      <p>
        No momento, a plataforma não salva cookies por conta própria, porém serviços de terceiros, como as bibliotecas de autenticação utilizadas, podem realizar esse salvamento.
      </p>
    </section>

    <section>
      <h3>
        Como garantimos a segurança dos seus dados?
      </h3>

      <p>
        Atualmente, nosso banco de dados está configurado para criptografar todos os dados antes que sejam gravados no disco, o que melhora muito a segurança dos usuários.
      </p>

      <p>
        Além disso, informações mais sensíveis, como e-mail e registros de despesas, estão com verificações para garantir que a leitura e atualização via plataforma seja realizada apenas pelo usuário que as criou. Isso significa que outro usuário autenticado não pode realizar a leitura dessas informações pela interface.
      </p>

      <p>
        Entretanto, reservamo-nos o direito de permitir a leitura a usuários administradores, principalmente em casos de solicitação de ajuda pelos próprios usuários, como para a resolução de problemas reportados via e-mail de suporte, solicitações de alteração de dados de forma manual, etc.
      </p>
    </section>

    <section>
      <h3>
        Sobre a exclusão de conta e dados
      </h3>

      <p>
        Atualmente, essa plataforma é sustentada por uma pequena quantidade de pessoas e possui poucos recursos financeiros. Dessa forma, ainda não conseguimos atender uma grande quantidade de solicitações/requisições simultâneas.
      </p>

      <p>
        Dessa forma, caso fosse solicitado a exclusão de cada registro criado por uma grande quantidade de usuários, a plataforma pode ter suas operações encerradas por atingir o consumo máximo de recursos permitido.
      </p>

      <p>
        Além disso, precisamos manter algumas informações armazenadas para o funcionamento correto da interface da plataforma, como as mensagens enviadas via interface de suporte, por exemplo.
      </p>

      <p>
        Portanto, ao ser solicitada uma exclusão de conta e dados, realizaremos a anonimização dos seus dados, de forma que o criador deles não possa ser mais reconhecido. A solicitação de exclusão poderá ser realizada via interface da plataforma.
      </p>
    </section>

    <section>
      <h3>
        Sobre o encerramento da plataforma
      </h3>

      <p>
        Reservamo-nos o direito de encerrar a plataforma a qualquer momento, com notificação prévia via interface da plataforma, e de realizar a exclusão de todos os dados registrados internamente caso as operações sejam encerradas.
      </p>
    </section>

    <section>
      <h3>
        Sobre a atualização de documentos, termos e políticas
      </h3>

      <p>
        Este documento/política pode ser atualizado futuramente. Caso isso seja necessário, realizaremos uma notificação via interface da plataforma. Para continuar utilizando a plataforma, será sempre necessário aceitar os documentos/termos/políticas mais recentes. Caso isso não seja possível, o usuário não poderá continuar utilizando a plataforma, e poderá, caso deseje, realizar a exclusão de sua conta conforme descrito no tópico "Sobre a exclusão de conta e dados".
      </p>
    </section>

    <section>
      <h3>
        Suporte e contato
      </h3>

      <p>
        Para tirar dúvidas ou reportar possíveis problemas, acesse o nosso <a :href="SUPPORT_FORM_URL">Formulário de Suporte</a>.
      </p>
    </section>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'document',
})

const { public: { SUPPORT_FORM_URL } } = useRuntimeConfig()
</script>
