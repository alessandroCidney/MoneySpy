<template>
  <v-container max-width="1000px">
    <h1>Termos de uso</h1>

    <p>
      Esses Termos de Uso em como finalidade regir o seu acesso e utilização do MoneySpy, fornecendo diversas informações sobre a plataforma. Por favor, leia-os com atenção.
    </p>

    <h2>
      Aceite dos termos e condições de utilização da plataforma
    </h2>

    <p>
      Ao utilizar a plataforma MoneySpy, o Usuário indica que leu e concordou com os Termos de Uso e com a Política de Privacidade da plataforma.
    </p>

    <p>
      Algumas páginas da plataforma MoneySpy necessitam que o Usuário passe pelo processo de cadastro para que possam ser acessadas. Durante o cadastro, a plataforma solicitará que o usuário informe os dados necessários para o login (e-mail, senha e dados pessoais), os quais serão requisitados posteriormente em futuros acessos à plataforma.
    </p>

    <p>
      Ao realizar o cadastro na plataforma MoneySpy, o Usuário concorda com os seguintes itens:
    </p>

    <ul>
      <li>
        O Usuário garante ser totalmente capaz de utilizar a plataforma e seus serviços ou estar autorizado por seus respectivos responsáveis legais.
      </li>

      <li>
        O Usuário concorda que possui responsabilidade pela autenticidade, veracidade, exatidão e atualização de seus dados pessoais cadastrados.
      </li>

      <li>
        O Usuário concorda que o login de acesso é totalmente pessoal e intransferível, garantindo que se responsabilizará completamente por guardar as informações de login e preservá-las em segurança.
      </li>

      <li>
        O Usuário confirma ter realizado a leitura, análise e aceite da Política de Privacidade da plataforma MoneySpy, onde informamos diversos aspectos relacionados ao tratamento e armazenamento de seus dados pessoais.
      </li>
    </ul>

    <p>
      Outro ponto importante é que, para que o Usuário consiga utilizar a plataforma MoneySpy, ele terá que aceitar que a plataforma (e, em casos extremos, seus administradores) tenha acesso aos seus dados pessoais e realize o armazenamento dessas informações. Para mais informações, você pode consultar a Política de Privacidade da plataforma.
    </p>

    <p>
      Se você não concorda com a Política de Privacidade ou com os Termos de Uso, por favor, não realize o cadastro na plataforma e não informe seus dados pessoais em nenhuma de suas telas ou interfaces.
    </p>

    <h2>
      Comportamento do Usuário
    </h2>

    <p>
      Ao utilizar a plataforma MoneySpy, o usuário concorda que não poderá enviar nenhum dos seguintes tipos de conteúdo ao utilizar suas telas, interfaces, campos ou componentes interativos:
    </p>

    <ul>
      <li>
        Conteúdo ofensivo, pornográfico, antiético, discriminatório, confidencial ou não condizente com as finalidades dos serviços oferecidos pela plataforma MoneySpy.
      </li>

      <li>
        Conteúdo que incentive ou ponha em prática atitudes criminosas ou que seja de alguma forma contrário às leis vigentes ou que infrinja os direitos de outras pessoas ou organizações.
      </li>

      <li>
        Conteúdo que possa causar danos e problemas técnicos à plataforma ou à dispositivos de outros Usuários (incluindo, mas não limitado a vírus de computador ou de quaisquer equipamentos ou softwares eletrônicos, injeção de scripts e códigos maliciosos, etc.)
      </li>
    </ul>

    <p>
      Além disso, ao utilizar a plataforma MoneySpy, o Usuário concorda que não poderá realizar quaisquer ações impróprias contra a plataforma e seus Usuários incluindo, mas não limitado a hacking , cracking, ataques de negação de serviço, engenharia social maliciosa, SQL injection, ataque XSS, ataque CSRF, etc.
    </p>

    <h2>
      Atualizações futuras
    </h2>

    <p>
      Os Termos de Uso e a Política de Privacidade poderão ser atualizados futuramente. Caso isso seja necessário, enviaremos uma notificação via interface da plataforma MoneySpy e, para continuar utilizando a plataforma, o Usuário concorda que sempre aceitará ambos os documentos em suas versões mais recentes. Caso o Usuário não concorde com isso, incentivamos a não realizar o cadastro na plataforma ou, caso já esteja cadastrado, excluir sua conta.
    </p>

    <h2>
      Suporte e contato
    </h2>

    <p>
      Para tirar dúvidas ou reportar possíveis problemas, acesse o nosso <a :href="SUPPORT_FORM_URL">Formulário de Suporte</a>.
    </p>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'document',
})

const { public: { SUPPORT_FORM_URL } } = useRuntimeConfig()
</script>
