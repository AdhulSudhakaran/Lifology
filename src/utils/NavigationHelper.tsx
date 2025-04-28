import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params: any) {
    if (navigationRef.isReady()) {
        //@ts-ignore
        navigationRef.navigate(name, params);
    } else {
        setTimeout(() => {
            navigate(name, params);
        }, 200);
    }
}

export function goBack() {
    if (navigationRef.isReady()) {
        navigationRef.goBack();
    }
}

export function reset(name: string) {
    if (navigationRef.isReady()) {
        // navigationRef.reset()
        navigationRef?.reset(({
            index: 0,
            routes: [{ name: name }]
        }))
    }
}