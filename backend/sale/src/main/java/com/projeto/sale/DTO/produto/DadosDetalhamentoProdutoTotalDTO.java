package com.projeto.sale.DTO.produto;

import java.math.BigDecimal;

public record DadosDetalhamentoProdutoTotalDTO(Long id, String nome, String unidade, Integer estoqueMinimo,
		Integer estoqueAtual, BigDecimal precoCusto, BigDecimal precoVenda) {

}
