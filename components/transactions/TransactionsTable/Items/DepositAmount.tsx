const DepositAmount = ({ logo, amount, token }: { logo: string; amount: any; token: string }) => {
    return (
        <div className="relative mt-[10px] cursor-pointer font-[SF-Pro-Rounded-light] text-[12px] w-[350px] h-[40px]  grid grid-cols-3 items-center border border-[#70a0eda8] bg-[#FAFAFA] rounded-[15px] justify-between">
            <div className="text-center flex items-center justify-center space-x-[5px]">
                <img alt="logo" src={process.env.NEXT_PUBLIC_IMAGE_BASE_URL + logo || ''} className="w-[10px] h-[10px]" />
                <div>Deposit Amount</div>
            </div>
            <p className="absolute left-1/2 transform -translate-x-1/2 text-center ">{amount?.value + ' ' + token}</p>
        </div>
    );
};

export default DepositAmount;
