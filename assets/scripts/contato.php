<?php
// Define o tipo de conteúdo como JSON
header('Content-Type: application/json; charset=utf-8');

// Verifica se o formulário foi enviado via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Captura e sanitiza os dados enviados pelo formulário
    $nome = filter_input(INPUT_POST, 'user_first_name', FILTER_SANITIZE_SPECIAL_CHARS);
    $sobrenome = filter_input(INPUT_POST, 'user_last_name', FILTER_SANITIZE_SPECIAL_CHARS);
    $email = filter_input(INPUT_POST, 'user_email', FILTER_VALIDATE_EMAIL);
    $assunto = filter_input(INPUT_POST, 'user_subject', FILTER_SANITIZE_SPECIAL_CHARS);
    $mensagem = filter_input(INPUT_POST, 'user_message', FILTER_SANITIZE_SPECIAL_CHARS);

    $nomeCompleto = trim($nome . ' ' . $sobrenome);

    // Valida os campos obrigatórios e o e-mail
    if (empty($nomeCompleto) || empty($email) || empty($assunto) || empty($mensagem)) {
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'Por favor, preencha todos os campos obrigatórios.']);
        exit;
    }

    if ($email === false) {
         http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'Por favor, insira um endereço de e-mail válido.']);
        exit;
    }


    // Define o destinatário (substitua pelo seu e-mail)
    $para = "engenharia@vmtec.eng.br"; // SUBSTITUA PELO SEU EMAIL REAL

    // Monta o assunto do e-mail
    $assunto_email = "Nova mensagem do site VMTEC: $assunto";

    // Monta o corpo do e-mail
    $corpo = "Nome: $nomeCompleto\n";
    $corpo .= "Email: $email\n";
    $corpo .= "Assunto: $assunto\n\n";
    $corpo .= "Mensagem:\n$mensagem\n";

    // Cabeçalhos do e-mail
    // É crucial usar um remetente que pertença ao domínio do servidor de envio, se possível.
    // Usar o email do usuário no "From" pode causar problemas de entrega (SPF/DKIM fails).
    // O Reply-To é a forma correta de permitir resposta direta ao usuário.
    $remetente_servidor = "website@" . ($_SERVER['SERVER_NAME'] ?? 'vmtec.eng.br'); // Use um email do seu domínio
    $headers = "From: VMTEC Website <" . $remetente_servidor . ">\r\n";
    $headers .= "Reply-To: $nomeCompleto <$email>\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();


    // Envia o e-mail
    // Adiciona tratamento de erro básico para mail()
    error_reporting(E_ALL); // Temporário para debug, remova em produção se não necessário
    ini_set('display_errors', 0); // Não mostre erros PHP ao usuário final
    // Log de erros é recomendado em vez de display_errors
    // ini_set('log_errors', 1);
    // ini_set('error_log', '/path/to/your/php-error.log');

    if (@mail($para, $assunto_email, $corpo, $headers)) {
        http_response_code(200); // OK
        echo json_encode(['success' => true, 'message' => 'Mensagem enviada com sucesso! Entraremos em contato em breve.']);
    } else {
        http_response_code(500); // Internal Server Error
        // Pega o último erro para log ou debug (não mostre ao usuário)
        $lastError = error_get_last();
        $errorMessage = 'Erro interno ao enviar a mensagem. Tente novamente mais tarde.';
        // Log do erro real (exemplo)
        // error_log("Mail failed: " . print_r($lastError, true));

        echo json_encode(['success' => false, 'message' => $errorMessage]);
    }
     exit;

} else {
    // Acesso direto ao arquivo sem POST
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Método não permitido.']);
    exit;
}
?>