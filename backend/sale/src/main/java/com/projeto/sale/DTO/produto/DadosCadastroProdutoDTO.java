package com.projeto.sale.DTO.produto;

import java.math.BigDecimal;

public record DadosCadastroProdutoDTO(String nome, String unidade, Integer estoqueMinimo, Integer estoqueAtual,
		BigDecimal precoCusto, BigDecimal precoVenda) {
}
