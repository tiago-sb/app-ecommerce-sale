package com.projeto.sale.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.sale.DTO.venda.ProdutoMaisVendidoDTO;
import com.projeto.sale.DTO.venda.ProdutoPorMesDTO;
import com.projeto.sale.service.VendaService;

@RestController
@RequestMapping("/venda")  
public class VendaController {
	@Autowired
	private VendaService vendaService;
	
	@GetMapping("/faturamento")
	public BigDecimal faturamentoTotal(){
		return vendaService.faturamentoTotal();
	}
	
	@GetMapping("/faturamento_mes")
	public BigDecimal faturamentoMes() {
		return vendaService.faturamentoMes();
	}
	
	@GetMapping("/mais_vendidos")
	public List<ProdutoMaisVendidoDTO> vendidos(){
		return vendaService.top10ProdutosMaisVendidos();
	}
	
	@GetMapping("/vendas_mes")
	public List<ProdutoPorMesDTO> vendidosMes(){
		return vendaService.produtosPorMes();
	}
}
