export const useUserSettings = () => {
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const emailNotifications = ref(false);
    const smsNotifications = ref(false);

    const saveSettings = () => {
        // Save settings logic
    };

    return {
        username,
        email,
        password,
        emailNotifications,
        smsNotifications,
        saveSettings
    };
};