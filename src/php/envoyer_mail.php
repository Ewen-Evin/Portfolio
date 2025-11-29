<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = htmlspecialchars($_POST["nom"]);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $telephone = htmlspecialchars($_POST["telephone"] ?? '');
    $message = htmlspecialchars($_POST["message"]);

    if (empty($nom) || empty($email) || empty($message)) {
        echo "Erreur : Tous les champs obligatoires doivent être remplis.";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Erreur : Format d'email invalide.";
        exit;
    }

    $to = "contact@ewenevin.fr"; // Adresse de réception
    $subject = "Nouveau message de contact de $nom";

    // ⚠️ utiliser une adresse de TON domaine ici (à créer chez ton hébergeur)
    $from = "contact@ewenevin.fr";

    $headers = "From: Portfolio <$from>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    $body = "Nom: $nom\n";
    $body .= "Email: $email\n";
    $body .= "Téléphone: $telephone\n\n";
    $body .= "Message:\n$message\n";
    $body .= "\n---\nCet email a été envoyé depuis le formulaire de contact de votre portfolio.";

    if (mail($to, $subject, $body, $headers)) {
        echo "Succès : Votre message a été envoyé.";
    } else {
        echo "Erreur : L'envoi de l'email a échoué. Veuillez réessayer plus tard.";
        error_log("Échec d'envoi d'email pour: $email");
    }
} else {
    echo "Méthode non autorisée.";
}
?>
