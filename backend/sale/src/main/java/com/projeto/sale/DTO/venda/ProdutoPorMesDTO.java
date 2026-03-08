package com.projeto.sale.DTO.venda;

import java.math.BigDecimal;

public record ProdutoPorMesDTO(Long quantidade, BigDecimal valor, Integer ano, Integer mes) {}
