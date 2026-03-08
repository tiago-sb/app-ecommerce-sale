package com.projeto.sale.DTO.produto;

import java.math.BigDecimal;

public record DadosDetalhamentoProdutoDTO(Long id, String nome, BigDecimal precoCusto, BigDecimal precoVenda) {
}
