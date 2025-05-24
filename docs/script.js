let isRequesting = false;

async function getGreeting() {
  if (isRequesting) return;
  isRequesting = true;

  console.log("✅ Button clicked");
  if (typeof window.ethereum === 'undefined') {
    alert('MetaMask is required!');
    isRequesting = false;
    return;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const contractAddress = "0x02fcB5df2b11a549234F9299ee8AA8F32982708e";
    const abi = [
      "function greet() public pure returns (string memory)"
    ];

    const contract = new ethers.Contract(contractAddress, abi, signer);
    const greeting = await contract.greet();

    document.getElementById("greeting").innerText = greeting;
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Check console for details.");
  }

  isRequesting = false;
}
