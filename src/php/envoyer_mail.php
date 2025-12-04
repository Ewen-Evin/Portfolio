<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/load_env.php';
require __DIR__ . '/../../../vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo "Méthode non autorisée.";
    exit;
}

$nom = htmlspecialchars($_POST["nom"] ?? '');
$email = filter_var($_POST["email"] ?? '', FILTER_SANITIZE_EMAIL);
$telephone = htmlspecialchars($_POST["telephone"] ?? '');
$message = htmlspecialchars($_POST["message"] ?? '');

if (empty($nom) || empty($email) || empty($message)) {
    echo "Erreur : Tous les champs obligatoires doivent être remplis.";
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Erreur : Format d'email invalide.";
    exit;
}

$mail = new PHPMailer(true);

try {
    // Config SMTP Zoho
    $mail->isSMTP();
    $mail->Host = $_ENV['MAIL_HOST'];
    $mail->SMTPAuth = true;
    $mail->Username = $_ENV['MAIL_USERNAME'];
    $mail->Password = $_ENV['MAIL_PASSWORD'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = $_ENV['MAIL_PORT'];

    // Expéditeur
    $mail->setFrom($_ENV['MAIL_FROM'], $_ENV['MAIL_FROM_NAME']);

    // Destinataire (toi)
    $mail->addAddress($_ENV['MAIL_TO']);

    // Répondre à → l’utilisateur
    $mail->addReplyTo($email);

    // Contenu
    $mail->isHTML(false);
    $mail->Subject = "Nouveau message de contact de $nom";

    $mail->Body = "Nom: $nom\n"
                . "Email: $email\n"
                . "Téléphone: $telephone\n\n"
                . "Message:\n$message\n"
                . "\n---\nEnvoyé depuis le portfolio.";

    $mail->send();
    echo "Succès : Votre message a été envoyé.";
} catch (Exception $e) {
    echo "Erreur : Impossible d'envoyer l'email.";
    error_log("Erreur SMTP : " . $mail->ErrorInfo);
}
