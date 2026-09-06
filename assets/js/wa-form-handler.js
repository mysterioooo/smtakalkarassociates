(function(){
    const waNumber = '918007237370';

    function openWhatsAppWith(form){
        if(!form) return;
        form.addEventListener('submit', function(e){
            e.preventDefault();

            if(!form.checkValidity()){
                form.reportValidity();
                return;
            }

            const fd = new FormData(form);
            const name = (fd.get('name') || '').toString().trim();
            const email = (fd.get('email') || '').toString().trim();
            const phone = (fd.get('phone') || '').toString().trim();
            const company = (fd.get('company') || '').toString().trim();
            const service = (fd.get('service') || '').toString().trim();
            const message = (fd.get('message') || '').toString().trim();

            const text = `*New Inquiry from Website*\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Company:* ${company || 'Not provided'}\n*Service:* ${service || 'Not specified'}\n*Message:*\n${message}`;

            const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');
        });
    }

    document.addEventListener('DOMContentLoaded', function(){
        openWhatsAppWith(document.getElementById('contactSectionForm'));
        openWhatsAppWith(document.getElementById('modalConsultationForm'));
    });
})();
