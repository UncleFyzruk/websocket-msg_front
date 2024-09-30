import React from 'react';
import {Button, Flex} from "antd";

const Start = () => {
    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">

        <div className="flex flex-col items-center">
             <Flex gap="small">
                  <Button type="primary" href="http://localhost:5173/login">
                    Постучаться
                  </Button>
             </Flex>
        </div>
        </div>
        </div>
    )
};

export default Start;