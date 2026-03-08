package com.projeto.sale.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

import com.projeto.sale.DTO.venda.ProdutoMaisVendidoDTO;
import com.projeto.sale.DTO.venda.ProdutoPorMesDTO;
import com.projeto.sale.repository.VendaRepository;

import jakarta.transaction.Transactional;

@Service
public class VendaService {
	
	@Autowired
	private VendaRepository vendaRepository;
	
	@Transactional
	public BigDecimal faturamentoTotal() {
	    BigDecimal faturamento = vendaRepository.faturamento();

	    return faturamento != null ? faturamento : BigDecimal.ZERO;
	}
	
	@Transactional
	public BigDecimal faturamentoMes() {
	    BigDecimal faturamento = vendaRepository.faturamentoMes();	
	    
	    return faturamento != null ? faturamento : BigDecimal.ZERO;
	}
	
	@Transactional
	public List<ProdutoMaisVendidoDTO> top10ProdutosMaisVendidos() {
	    Pageable limite = PageRequest.of(0, 10);

	    return vendaRepository.produtosMaisVendidos(limite);
	}
	
	@Transactional
	public List<ProdutoPorMesDTO> produtosPorMes(){
		return vendaRepository.vendasPorMes();
	}
}
