import { memo } from "react";

const Footer=()=>{

    return (
        <footer className="py-4 xl:py-6 w-full" style={{backgroundColor: '#222021'}}>
            <div className="container mx-auto">
                <div className="grid grid-cols-3">
                    <div className="">
                       <p>@ Copyright 2024 ZOMO. All rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default memo(Footer);