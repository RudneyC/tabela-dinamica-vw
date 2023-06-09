$(document).ready(function() {
	// Define a URL do arquivo CSV
	var url = "https://github.dev/RudneyC/testenovo/blob/main/data.csv";

	// Carrega o arquivo CSV com o AJAX
	$.get(url, function(data) {
		// Converte o arquivo CSV em um objeto JSON
		var jsonData = $.csv.toObjects(data);

		// Adiciona os dados na tabela
		var table = $('#myTable').DataTable({
			data: jsonData,
			columns: [
				{ data: "coluna1" },
				{ data: "coluna2" },
				{ data: "coluna3" },
				{ data: "coluna4" },
				{ data: "coluna5" }
			],
			order: [[0, 'asc']],
			initComplete: function () {
				// Adiciona filtros dinâmicos
				this.api().columns().every(function () {
					var column = this;
					var select = $('<select><option value=""></option></select>')
						.appendTo($(column.header()))
						.on('change', function () {
							var val = $.fn.dataTable.util.escapeRegex(
								$(this).val()
							);
							column
								.search(val ? '^' + val + '$' : '', true, false)
								.draw();
						});
					column.data().unique().sort().each(function (d, j
