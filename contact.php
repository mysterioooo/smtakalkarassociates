<?php
// Enforce post request only
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // 1. Configure your email settings
    // For GoDaddy, using a matching domain email (e.g., info@smtakalkarassociates.com) prevents spam filtering
    $to_email = "casumittakalkar@gmail.com"; 
    $from_email = "no-reply@smtakalkarassociates.com"; // Replace with your domain's professional email address
    
    // 2. Sanitize and collect form data
    $name    = strip_tags(trim($_POST["name"] ?? ''));
    $email   = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone   = strip_tags(trim($_POST["phone"] ?? ''));
    $service = strip_tags(trim($_POST["service"] ?? ''));
    $message = strip_tags(trim($_POST["message"] ?? ''));

    // 3. Simple Validation
    if (empty($name) || empty($email) || empty($phone) || empty($message)) {
        // Redirect back with an error code if required fields are missing
        header("Location: contact.html?status=error#contact-form");
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: contact.html?status=invalid-email#contact-form");
        exit;
    }

    // 4. Construct the Email Content
    $subject = "New Website Inquiry: " . ucwords(str_replace('_', ' ', $service));
    
    $email_content = "You have received a new inquiry from your website contact form.\n\n";
    $email_content .= "--- Client Details ---\n";
    $email_content .= "Full Name: $name\n";
    $email_content .= "Email Address: $email\n";
    $email_content .= "Phone Number: $phone\n";
    $email_content .= "Service Required: " . strtoupper($service) . "\n\n";
    $email_content .= "--- Message ---\n";
    $email_content .= $message . "\n";

    // 5. Construct Email Headers (Crucial for GoDaddy Delivery)
    $headers = [
        "From" => "S M Takalkar & Associates <" . $from_email . ">",
        "Reply-To" => $name . " <" . $email . ">",
        "X-Mailer" => "PHP/" . phpversion(),
        "Content-Type" => "text/plain; charset=UTF-8"
    ];

    // 6. Send the Email
    if (mail($to_email, $subject, $email_content, $headers)) {
        // Success redirect
        header("Location: contact.html?status=success#contact-form");
    } else {
        // Server side error redirect
        header("Location: contact.html?status=server-error#contact-form");
    }
    exit;

} else {
    // If someone tries to access contact.php directly, redirect them back to contact page
    header("Location: contact.html");
    exit;
}
?>