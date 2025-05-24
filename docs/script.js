async function getGreeting() {
  if (typeof window.ethereum === 'undefined') {
    alert('MetaMask is required!');
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();

  const contractAddress = "0x02fcB5df2b11a549234F9299ee8AA8F32982708e"; // YOUR contract address
  const abi = [
    "function greet() public pure returns (string memory)"
  ];

  const contract = new ethers.Contract(contractAddress, abi, signer);

  try {
    const greeting = await contract.greet();
    document.getElementById("greeting").innerText = greeting;
  } catch (error) {
    console.error(error);
    alert("Failed to get greeting.");
  }
}
