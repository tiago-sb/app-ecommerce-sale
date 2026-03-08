package com.projeto.sale.DTO.produto;

import java.math.BigDecimal;

public record DadosAtualizacaoProdutoDTO(String nome, String unidade, Integer estoqueMinimo, Integer estoqueAtual,
		BigDecimal precoCusto, BigDecimal precoVenda) {

}
