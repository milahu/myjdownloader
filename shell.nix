{ pkgs ? import <nixpkgs> { }
}:

pkgs.mkShell {
  buildInputs = with pkgs; [
    gnumake
    (python3.withPackages (pp: with pp; [
      aiohttp
      aiohttp-cors
      nest-asyncio
    ]))
  ];
}
