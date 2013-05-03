<html>
	<head>
		<title>Farm Warfare - Test</title>
	</head>
	<body>
		<?php
			$map = @join("", @file('map-test.txt'));
			$dummy = explode("\n", $map);
			$map = str_replace("\n", ":", $map);
			echo $map;
		?>
	</body>
</html>