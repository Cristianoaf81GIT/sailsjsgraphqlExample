const graphql = require('graphql');
const { rootResolvers } = require('../../resolvers');

const timeStampValue = value => {
    if (new Date(Number(value)).getTime() > 0)
        return value;
}


const TimeStampType = new graphql.GraphQLScalarType({
    name: 'Datetime',
    description: 'Timestamp value',
    serialize: timeStampValue,
    parseValue: timeStampValue,
    parseLiteral(data) {        
        return new Date(Number(data.value)).getTime();
    }
});

const UserType = new graphql.GraphQLObjectType({
    name: 'UserType_StudyEvent',
    description: 'User',
    fields: {
        id: { type: graphql.GraphQLInt, description: 'User id'},
        fullName: { type: graphql.GraphQLString, description: 'User fullName' },
        email: { type: graphql.GraphQLString, description: 'User e-mail' },
        createdAt: { type: TimeStampType, description: 'timestamp creation data' },
        updatedAt: { type: TimeStampType, description: 'timestamp update date' }     
    }
});

const StudyEventType = new graphql.GraphQLObjectType({
    name: 'StudyEvent',
    description: 'Study Event like [course, youtube, ebook/pdf]',
    fields: {
        id: { type: graphql.GraphQLInt, description: 'Study event id' },
        subject: { type: graphql.GraphQLString, description: 'Study subject'  },
        source: { type: graphql.GraphQLString, description: 'Study source: [ONLINE_COURSE,YOUTUBE,PDF/EBOOK,BOOK]'},
        resourceName: { type: graphql.GraphQLString, description: 'Course\'s name or ebook/pdf title' },
        link: { type: graphql.GraphQLString, description: 'Optional link (url) to ONLINE_COURSE/YOUTUBE video(s)'},
        image: { type: graphql.GraphQLString, description: 'Optional image (url) ebook/pdf cover or video preview image'},
        estimatedTime: { type: TimeStampType, description: 'Optional timestamp when course or ebook/pdf will terminate' },
        isConcluded: { type: graphql.GraphQLBoolean, description: 'Optional boolean [default value is false] the course or book is concluded?'},
        conclusionDate: { type: TimeStampType,  description: 'Optional timestamp, date of conclusion' },
        user: { type: UserType, description: 'User object data' },
    }
});

const StudyEventListType = new graphql.GraphQLObjectType({
    name: 'StudyEventlist',
    description: 'User\'s StudyEvent list',
    fields: () => (
        {
            UserStudyEvents: { 
                type: new graphql.GraphQLList(StudyEventType), 
                description: 'all user Study Event',
                resolve: rootResolvers.getAllStudyEvents
            }
        }
    )
    // fields: {
    //     studyEvents: {
    //         type: new graphql.GraphQLList(StudyEventType), 
    //         description: 'all user Study Event',
    //         resolve: rootResolvers.getAllStudyEvents
    //     }
    // }
});

const studyEventCreate = {
    type: StudyEventType,
    description: 'Create a new StudyEvent',
    args: {
        subject: { type: graphql.GraphQLString, description: 'Study subject' },
        source: { type: graphql.GraphQLString, description: 'Study source: [ONLINE_COURSE,YOUTUBE,PDF/EBOOK,BOOK]'},
        resourceName: { type: graphql.GraphQLString, description: 'Course\'s name or ebook/pdf title' },
        link: { type: graphql.GraphQLString, description: 'Optional link (url) to ONLINE_COURSE/YOUTUBE video(s)'},
        image: { type: graphql.GraphQLString, description: 'Optional image (url) ebook/pdf cover or video preview image' },
        estimatedTime: { type: TimeStampType, description: 'Optional timestamp when course or ebook/pdf will terminate' },
        isConcluded: { type: graphql.GraphQLBoolean, description: 'Optional boolean [default value is false] the course or book is concluded?'},
        conclusionDate: { type: TimeStampType, description: 'Optional timestamp, date of conclusion' },        
    },
    resolve: rootResolvers.createStudyEvent
};

const studyEventUpdate = {
    type: StudyEventType,
    description: 'Update an existing StudyEvent',
    args: {
        id: {type: graphql.GraphQLInt, description: 'Mandatory StudyEvent id'},
        subject: { type: graphql.GraphQLString, description: 'Optional Study subject' },
        source: { type: graphql.GraphQLString, description: 'Optional Study source: [ONLINE_COURSE,YOUTUBE,PDF/EBOOK,BOOK]'},
        resourceName: { type: graphql.GraphQLString, description: 'Optional Course\'s name or ebook/pdf title' },
        link: { type: graphql.GraphQLString, description: 'Optional link (url) to ONLINE_COURSE/YOUTUBE video(s)'},
        image: { type: graphql.GraphQLString, description: 'Optional image (url) ebook/pdf cover or video preview image' },
        estimatedTime: { type: TimeStampType, description: 'Optional timestamp when course or ebook/pdf will terminate' },
        isConcluded: { type: graphql.GraphQLBoolean, description: 'Optional boolean [default value is false] the course or book is concluded?'},
        conclusionDate: { type: TimeStampType, description: 'Optional timestamp, date of conclusion' }
    },
    resolve: rootResolvers.updateStudyEvent
}

const studyEventDelete = {
    type: StudyEventType,
    description: 'Delete an existing StudyEvent by id',
    args: {
        id: {type: graphql.GraphQLInt, description: 'Mandatory field StudyEvent id'}
    },
    resolve: rootResolvers.deleteStudyEvent
}

const studyEventGetAll = {
    type: StudyEventListType,
    description: 'Get All studyEvents',
    resolve: rootResolvers.getAllStudyEvents
}

module.exports = {
    studyEventCreate,
    studyEventUpdate,
    studyEventDelete,
    studyEventGetAll
}