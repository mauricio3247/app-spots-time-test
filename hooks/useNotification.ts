import { notification } from "antd";
import { useEffect, useState } from "react";

const setNotification = (error:any)=> {
    
    /**
     * to error with message
     */
    if(error && error.message) {
      notification.open({
        message: error.title,
        description: error.message,
      });
    } else if(error) {
        notification.open({
            message: 'Unknown Error',
            description: 'Unknown Error'
          });
    }

  }

export const useNotificationError =() => {

    const [error, setError] = useState<any>(null)
    useEffect(() => {
        setNotification(error)
    }, [error])


    return [error, setError]

}