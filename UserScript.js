// ==UserScript==
// @name         Substituir Assinatura Projudi -> Estagiário -> Servidor
// @version      0.3
// @description  Substituidor automático de assinatura em documentos / Clickar no Iframe e apertar F4 para retornar os dados de estagiário
// @author       THEFERNANBRI
// @match        *://*.jus.br/*
// @icon         https://www.tjpr.jus.br/o/tjpr-internet-theme/images/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function substituirTextoOriginal() {
        console.log("Função substituirTextoOriginal chamada");
        // Encontrar o iframe pela classe
        var iframe = document.querySelector('iframe.cke_wysiwyg_frame.cke_reset');

        if (iframe) {
            // Acessar diretamente o conteúdo do iframe usando contentDocument
            var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

            function substituirTexto(textoAntigo, textoNovo) {
                var textNodes = iframeDocument.evaluate('//text()', iframeDocument, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

                for (var i = 0; i < textNodes.snapshotLength; i++) {
                    var node = textNodes.snapshotItem(i);
                    if (node.textContent.trim() === textoAntigo) {
                        node.textContent = textoNovo;
                    }
                }
            }

            substituirTexto("SEU NOME AQUI", "NOME DO TÉCNICO OU ANALISTA");
            substituirTexto("Estagiário(a)", "Técnico(a) Judiciária(o)");
        } else {
            console.error("Iframe do texto original não encontrado.");
        }
    }

    function substituirTextoNoIframe2() {
        console.log("Função substituirTextoNoIframe2 chamada");
        // Encontrar o iframe pela classe
        var iframe = document.querySelector('iframe.cke_wysiwyg_frame.cke_reset');

        if (iframe) {
            // Acessar diretamente o conteúdo do iframe usando contentDocument
            var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

            function substituirTexto(textoAntigo, textoNovo) {
                var textNodes = iframeDocument.evaluate('//text()', iframeDocument, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

                for (var i = 0; i < textNodes.snapshotLength; i++) {
                    var node = textNodes.snapshotItem(i);
                    if (node.textContent.trim() === textoAntigo) {
                        node.textContent = textoNovo;
                    }
                }
            }

            substituirTexto("SEU NOME AQUI", "NOME DO TÉCNICO OU ANALISTA");
            substituirTexto("Técnico(a) Judiciário(a)", "Estagiário(a)");
        } else {
            console.error("Iframe do texto modificado não encontrado.");
        }
    }

    // Usar MutationObserver para observar mudanças na estrutura da página
    var observer = new MutationObserver(function(mutations) {
        // Se houver alterações, verifique novamente se o iframe está disponível
        substituirTextoOriginal();
    });

    // Configurar o MutationObserver para observar alterações no nó body da página
    observer.observe(document.body, { subtree: true, childList: true });

    // Adicionar um event listener para a tecla F4
    document.addEventListener('keydown', function(event) {
        // Verificar se a tecla pressionada é a F4
        if (event.key === 'F4') {
            console.log("Tecla F4 pressionada");
            // Realizar a substituição
            substituirTextoNoIframe2();
        }
    });

})();
