export const createChatSlice = (set, get) => ({
    selectedChatType:undefined,
    selectedChatData:undefined,
    selectedChatMessages: [],
    directMessagesContact: [],
    isUploading:false,
    isDownloading: false,
    fileUploadProgress:0,
    fileDownloadProgress:0,
    channels:[],
    setChannels: (channels) => {
        const currentChannels = get().channels;
        if(JSON.stringify(currentChannels) !== JSON.stringify(channels)){
            set({channels})
        }
    },
    setIsUploading: (isUploading) => set({isUploading}),
    setIsDownloading: (isDownloading) => set({isDownloading}),
    setFileUploadProgress: (fileUploadProgress) => set({fileUploadProgress}),
    setFileDownloadProgress: (fileDownloadProgress) => set({fileDownloadProgress}), 
    setSelectedChatType: (selectedChatType) => set({selectedChatType}),
    setSelectedChatData: (selectedChatData) => set({selectedChatData}), 
    setSelectedChatMessages: (selectedChatMessages) => {
        const currentMessages = get().selectedChatMessages;
        if (JSON.stringify(currentMessages) !== JSON.stringify(selectedChatMessages)) {
            set({ selectedChatMessages });
        }
    },
    setDirectMessagesContact: (directMessagesContact) => {
        const currentContacts = get().directMessagesContact;
        if (JSON.stringify(currentContacts) !== JSON.stringify(directMessagesContact)) {
            set({ directMessagesContact });
        }
    },
    closeChat: () => set({
        selectedChatData:undefined,
        selectedChatType:undefined,
        selectedChatMessages: [],
    }),
    addMessage: (message)=>{
        const selectedChatMessages = get().selectedChatMessages;
        const selectedChatType = get().selectedChatType;

        set({
            selectedChatMessages: [
                ...selectedChatMessages,{
                    ...message,
                    recipient: selectedChatType==="channel" ? message.recipient : message.recipient._id,
                    sender: selectedChatType==="channel" ? message.sender : message.sender._id,
                }
            ]
        })
    },
    addChannel: (channel) =>{
        const channels = get().channels;
        set({channels:[channel, ...channels]})
    },
    addChannelInChannelList: (message) => {
        const channels = get().channels;
        const data = channels.find((channel)=>channel._id===message.channelId)
        const index = channels.findIndex(
            (channel)=>channel._id===message.channelId
        );
        if(index !== -1 && index !== undefined){
            channels.splice(index,1);
            channels.unshift(data);
        }

    },
    addContactInDmList: (message) => {
        const userId = get().userInfo.id
        const fromId = message.sender._id === userId ? message.recipient._id : message.sender._id;

        const fromData = message.sender._id === userId ? message.recipient : message.sender;
        const dmContacts = get().directMessagesContact;
        const data = dmContacts.find((contact) => contact._id === fromId);
        const index = dmContacts.findIndex((contact) => contact._id === fromId);
        console.log({ data, index, dmContacts, userId, message, fromData});

        if(index !== -1 && index !== undefined) {
            dmContacts.splice(index, 1);
            dmContacts.unshift(data);
        }
        else{
            dmContacts.unshift(fromData)
        }
        set({ directMessagesContact: dmContacts})
    }
})

