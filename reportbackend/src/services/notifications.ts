import { getMessaging } from "firebase-admin/messaging";

export async function sendGlobalNotification(title:string,body:string,tokens:string[]){
      
        const message = {
          notification: {
            title: title,
            body: body
          },
          tokens: ['cfJ_WnTZRFOLHH90eLy2fr:APA91bGerthpr_32iMrXfbfWZRforoyuJ64X-ZqVID0rrum61OdBJaem3AKJfz8WlZIWBTAyMRY6_RkRnfHoGxNzFOaRdyarJmfpUNRGrzOJpGBeA0vQp6xXX1xT4X31tvLi79H7JIry'] // Array of device tokens
        };
      
        try {
          const response = await getMessaging().sendMulticast(message);
          console.log(`Successfully sent ${response.successCount} messages and ${response.failureCount} failed.`);
        } catch (error) {
          console.log("Failed to send notifications")
        }
}