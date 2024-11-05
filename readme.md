# Account SDK

A interface `IAccountSDK` define métodos de autenticação e gerenciamento de usuários, como login, criação de credenciais, atualização de informações de perfil, gerenciamento de tarefas do usuário e conquistas. Esses métodos permitem que os desenvolvedores integrem funcionalidades de gerenciamento de conta e permissões de usuário.

### Métodos Disponíveis

1. **Autenticação e Tokens**

   - `signIn(login: string, password: string)`: Realiza o login e retorna um token de autenticação.
   - `signOut(jwtToken: string)`: Encerra a sessão do usuário.
   - `checkToken(jwtToken: string)`: Verifica a validade do token JWT.
   - `refreshToken(jwtToken: string)`: Renova o token JWT.
   - `rememberPassword(login: string)`: Envia um token para recuperação de senha.
   - `resetPasswordFromToken(login: string, jwtTokenToRenew: string, newPassword: string)`: Redefine a senha usando o token de recuperação.

2. **Gerenciamento de Usuários**

   - `createCredentials(credentials: IUserCredentials, userInContext: ContextUserInfo<any>, userDetails?: IUserAccountDetails)`: Cria novas credenciais para o usuário.
   - `updateUserInfoByToken(jwtToken: string, userAccountInfo: T)`: Atualiza informações do usuário usando um token JWT.
   - `updateUserInfoByAccountId(accountId: string, userDetails: IUserAccountDetails)`: Atualiza informações do usuário usando o ID da conta.
   - `getContextUserInfo(jwtToken: string)`: Retorna informações de contexto do usuário.

3. **Gerenciamento de Tarefas e Conquistas**

   - `listUserTasks(jwtToken: string)`: Lista todas as tarefas do usuário.
   - `addUserTask(jwtToken: string, task: InteractionItem)`: Adiciona uma nova tarefa para o usuário.
   - `updateUserTasks(jwtToken: string, tasks: UserInteractions)`: Atualiza tarefas do usuário.
   - `removeUserTask(jwtToken: string, taskAlias: string)`: Remove uma tarefa específica do usuário.
   - `listAchievements(jwtToken: string)`: Lista todas as conquistas do usuário.
   - `addAchievement(jwtToken: string, achievement: InteractionItem)`: Adiciona uma nova conquista para o usuário.
   - `updateAchievement(jwtToken: string, achievementAlias: string, achievement: InteractionItem)`: Atualiza uma conquista específica do usuário.
   - `removeAchievement(jwtToken: string, achievementAlias: string)`: Remove uma conquista específica do usuário.

4. **Gerenciamento de Permissões e Perfil**
   - `removeProfilePermission(jwtToken: string, profileAlias: string)`: Remove uma permissão de perfil específica.
   - `updateProfilePermission(jwtToken: string, profiles: string[])`: Atualiza as permissões de perfil.
   - `listProfiles(jwtToken: string)`: Lista os perfis disponíveis para o usuário.
   - `toggleActive(jwtToken: string, active: boolean)`: Ativa ou desativa o perfil do usuário.

### Exemplo de Uso

```typescript
import { IAccountSDK } from "./IAccountSDK";

async function userAuthenticationExample(accountSDK: IAccountSDK) {
  // Login do usuário
  const loginResult = await accountSDK.signIn(
    "user@example.com",
    "password123"
  );
  if (loginResult.success) {
    const { token, expiresIn, userInfo } = loginResult.data;
    console.log(`User logged in. Token: ${token}, Expires In: ${expiresIn}`);
  }

  // Recuperação de senha
  const rememberPasswordResult = await accountSDK.rememberPassword(
    "user@example.com"
  );
  if (rememberPasswordResult.success) {
    console.log(
      `Token para redefinição de senha enviado: ${rememberPasswordResult.data.tokenToRenew}`
    );
  }

  // Listar tarefas do usuário
  const tasksResult = await accountSDK.listUserTasks("user_jwt_token");
  if (tasksResult.success) {
    console.log("User tasks:", tasksResult.data);
  }

  // Atualizar informações do usuário
  const updateUserResult = await accountSDK.updateUserInfoByToken(
    "user_jwt_token",
    {
      firstName: "New",
      lastName: "Name",
    }
  );
  if (updateUserResult.success) {
    console.log("User info updated successfully.");
  }

  // Adicionar nova conquista
  const addAchievementResult = await accountSDK.addAchievement(
    "user_jwt_token",
    {
      alias: "first_login",
      name: "Primeiro Login",
      description: "Usuário realizou login pela primeira vez",
    }
  );
  if (addAchievementResult.success) {
    console.log("Achievement added successfully.");
  }
}
```

---

### Observações

- **Segurança**: Ao utilizar a `IAccountSDK`, garanta que os tokens JWT estejam protegidos e sejam utilizados de forma segura.
- **Gerenciamento de Estado**: Os tokens e os segredos do OTP devem ser armazenados e recuperados de maneira segura para manter a integridade dos métodos de autenticação e autorização.
- **Tratamento de Erros**: Lide com erros retornados pelos métodos `IAccountSDK` e `OTPService` para garantir uma experiência de usuário robusta.

---

## Classe `OTPService`

A `OTPService` é uma classe para gerenciamento de OTPs (One-Time Passwords), utilizada principalmente para autenticação de dois fatores com o Google Authenticator. A classe permite a geração de um `secret`, criação de tokens OTP, validação de tokens e geração de QR Codes para fácil configuração.

### Métodos Disponíveis

1. **`generateUserSecret()`**: Gera um secret único para cada usuário.
2. **`generateToken(secret: string)`**: Gera um token OTP com base no secret fornecido.
3. **`validateToken(token: string, secret: string)`**: Valida o token OTP com base no secret fornecido.
4. **`generateQRCode(secret: string, issuer: string, accountName: string)`**: Gera um QR Code para configuração no Google Authenticator.
5. **`getCurrentToken(secret: string)`**: Obtém o código OTP atual com base no secret.

### Exemplo de Uso

```typescript
import OTPService from "./OTPService";

// Gera um novo secret para o usuário
const userSecret = OTPService.generateUserSecret();
console.log(`Generated User Secret: ${userSecret}`);

// Exibir o código OTP atual usando o secret do usuário
const currentOtp = OTPService.getCurrentToken(userSecret);
console.log(`Current OTP Code: ${currentOtp}`);

// Validar o OTP
const isValid = OTPService.validateToken(currentOtp, userSecret);
console.log(`Is OTP valid? ${isValid}`);

// Gerar QR Code para configuração no Google Authenticator
const issuer = "YourAppName";
const accountName = "user@example.com";
OTPService.generateQRCode(userSecret, issuer, accountName).then((qrCode) => {
  console.log(`QR Code URL: ${qrCode}`);
});
```
