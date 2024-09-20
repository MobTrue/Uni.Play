$(document).ready(function() {
    $('.add-to-cart-btn').click(function() {
        // Coletar informações do produto
        const productName = $(this).data('name');
        const productPrice = parseFloat($(this).data('price').replace(',', '.'));

        // Criar o link de pagamento
        $.ajax({
            url: 'https://api.mercadopago.com/checkout/preferences',
            type: 'POST',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer APP_USR-623607975947359-082518-505091af1ed4aa1144314f2ed4103453-335729373' // Seu Access Token
            },
            data: JSON.stringify({
                items: [
                    {
                        title: productName,
                        quantity: 1,
                        currency_id: 'BRL',
                        unit_price: productPrice
                    }
                ],
                back_urls: {
                    success: 'http://www.seusite.com/sucesso',
                    failure: 'http://www.seusite.com/falha',
                    pending: 'http://www.seusite.com/pendente'
                },
                auto_return: 'approved'
            }),
            success: function(data) {
                // Redirecionar para o link de pagamento
                window.location.href = data.init_point;
            },
            error: function(xhr, status, error) {
                console.error('Erro ao criar link de pagamento:', error);
            }
        });
    });
});