// import React, { useState } from 'react';
// import { Button, Text, VStack } from "@chakra-ui/react";
// import { FaCamera } from "react-icons/fa";
// import html2canvas from 'html2canvas';
// import Empty from './Empty';

// function CaptureButton() {
//     const [originalSrcs, setOriginalSrcs] = useState<string[]>([]);
//     const [isLoading, setIsLoading] = useState<boolean>(false);

//     const convertImgToBase64 = (img: HTMLImageElement): Promise<string> => {
//         return new Promise((resolve) => {
//             const canvas = document.createElement('canvas');
//             canvas.width = img.width;
//             canvas.height = img.height;
//             const ctx = canvas.getContext('2d')!;
//             ctx.drawImage(img, 0, 0);
//             resolve(canvas.toDataURL());
//         });
//     };

//     const replaceImagesToBase64 = async (parentElement: HTMLElement) => {
//         const imgElements = parentElement.querySelectorAll('img');
//         const originalSrcList: string[] = [];
    
//         imgElements.forEach(async (img) => {
//             originalSrcList.push(img.src);
//             const base64Data = await convertImgToBase64(img as HTMLImageElement);
//             img.setAttribute('src', base64Data);
//         });
    
//         setOriginalSrcs(originalSrcList);
//     };
    

//     const restoreOriginalImages = (parentElement: HTMLElement) => {
//         const imgElements = parentElement.querySelectorAll('img');
//         imgElements.forEach((img, index) => {
//             img.src = originalSrcs[index];
//         });
//         setOriginalSrcs([]); // Clear the original sources state
//     };

//     const captureScreen = async () => {
//         const targetElement = document.getElementById('captureTarget');
//         if (!targetElement) return;
    
//         setIsLoading(true);  // 로딩 시작
    
//         // 이미지를 Base64로 변환
//         await replaceImagesToBase64(targetElement);
    
//         const canvas = await html2canvas(targetElement, { useCORS: true });
//         const imgData = canvas.toDataURL();
    
//         // 복원 로직 추가
//         restoreOriginalImages(targetElement);
    
//         // 이미지 다운로드 부분
//         const link = document.createElement('a');
//         link.href = imgData;
//         link.download = 'screenshot.png';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
    
//         setIsLoading(false);  // 로딩 완료
//     };
    

//     return (
//         <VStack spacing={3}>
//              <Empty />
//              <Button onClick={captureScreen} color="gray" isLoading={isLoading}>
//                 <FaCamera />
//              </Button>
//              <Text fontSize={"sm"} as="b" color={"gray"}> 화면을 캡쳐하여 팀원들에게 공유해주세요! </Text>
//              <Empty />
//          </VStack>
//     );
// }

// export default CaptureButton;


import { Button, Text, useToast, VStack } from "@chakra-ui/react";
import html2canvas from 'html2canvas';
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import Empty from "./Empty";

export default function CaptureButton() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toast = useToast();

    const captureScreen = async () => {
        setIsLoading(true);

        const targetElement = document.getElementById('captureTarget');
        if (!targetElement) return;

        try {
            const canvas = await html2canvas(targetElement, { useCORS: true });
            const imgData = canvas.toDataURL();
        
            if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                // 모바일 브라우저에서 실행 중인 경우
                window.open(imgData, '_blank');
            } else {
                // 데스크톱 브라우저에서 실행 중인 경우
                const link = document.createElement('a');
                link.href = imgData;
                link.download = 'screenshot.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        
            toast({
                title: "캡쳐 성공",
                status: "success",
                duration: 1000,
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "캡쳐 실패",
                status: "error",
                duration: 1000,
            });
        } finally {
            setIsLoading(false);
        }
        
    };

    return (
        <VStack spacing={0}>
            <Empty />
            <Button onClick={captureScreen} color="gray" isLoading={isLoading} my={3}>
                <FaCamera />
            </Button>
            <Text fontSize={"sm"} as="b" color={"gray"}> 화면을 캡쳐하여 팀원들에게 공유해주세요! </Text>
            <Text fontSize={"xs"} color={"gray"} pt={0}> *라이트 모드에서 사용하세요 </Text>
            <Empty />
        </VStack>
    );
}





// import React, { useState } from 'react';
// import { Button, VStack, Text } from "@chakra-ui/react";
// import html2canvas from 'html2canvas';
// import { FaCamera } from "react-icons/fa";
// import Empty from "./Empty";

// export default function CaptureButton() {
//     const [isLoading, setIsLoading] = useState<boolean>(false);

//     const captureScreen = async () => {
//         setIsLoading(true);

//         const targetElement = document.getElementById('captureTarget');
//         if (!targetElement) return;

//         const imgElements = targetElement.querySelectorAll('img');
//         const originalSrcList: string[] = [];

//         // 이미지의 src 속성을 일시적으로 비움
//         for (const img of Array.from(imgElements)) {
//             originalSrcList.push(img.src);
//             img.setAttribute('src', '');
//         }


//         const canvas = await html2canvas(targetElement, { useCORS: true });
//         const imgData = canvas.toDataURL();

//         // 이미지의 src 속성을 원래대로 복원
//         imgElements.forEach((img, index) => {
//             img.setAttribute('src', originalSrcList[index]);
//         });

//         // 캡쳐 이미지를 다운로드
//         const link = document.createElement('a');
//         link.href = imgData;
//         link.download = 'screenshot.png';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);

//         setIsLoading(false);
//     };

//     return (
//         <VStack spacing={3}>
//             <Empty />
//             <Button onClick={captureScreen} color="gray" isLoading={isLoading}>
//                 <FaCamera />
//             </Button>
//             <Text fontSize={"sm"} as="b" color={"gray"}> 화면을 캡쳐하여 팀원들에게 공유해주세요! </Text>
//             <Empty />
//         </VStack>
//     );
// }
