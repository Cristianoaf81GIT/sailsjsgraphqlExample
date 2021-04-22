const graphql = require('graphql');
const { rootResolvers } = require('../../resolvers');


/**
 * function to serialize and parse a string timestamp to js Date timestamp
 * @param { string } value number in string format representing a timestamp 
 * @returns {number} value
 */
const timeStampValue = value => {
    if (new Date(Number(value)).getTime() > 0)
        return value;
}

/**
 * GraphQLScalarType TimeStampType
 * @param { string } name string - GraphQLScalarType\'s name
 * @param { string } description string - GraphQLScalarType\'s description
 * @param { function } serialize function - function to serialize a string value
 * @param { function } parseValue Function - function to parse a string value to number
 * @param { function } parseLiteral Function - function to convert string value to literal\'s number
 */
const TimeStampType = new graphql.GraphQLScalarType({
    name: 'Datetime',
    description: 'Timestamp value',
    serialize: timeStampValue,
    parseValue: timeStampValue,
    parseLiteral(data) {        
        return new Date(Number(data.value)).getTime();
    }
});

/**
 * GraphQLObjectType UserType
 * @param { string } name string - GraphQLObjectType\'s name
 * @param { string } description string - GraphQLObjectType\'s description
 * @param {{
 *  id: number, 
 *  fullName: string, 
 *  email: string, 
 *  createdAt: number, 
 *  updatedAt: number
 * }} fields Object - fields representing user data 
 */
const UserType = new graphql.GraphQLObjectType({
    name: 'UserType_StudyEvent',
    description: 'User',
    fields: {
        id: { 
            type: graphql.GraphQLInt, 
            description: 'User id'
        },
        fullName: { 
            type: graphql.GraphQLString, 
            description: 'User fullName' 
        },
        email: { 
            type: graphql.GraphQLString, 
            description: 'User e-mail' 
        },
        createdAt: { 
            type: TimeStampType, 
            description: 'timestamp creation data' 
        },
        updatedAt: { 
            type: TimeStampType, 
            description: 'timestamp update date' 
        }     
    }
});

/**
 * GraphQLObjectType StudyEventType
 * @param { string } name string - GraphQLObjectType\'s name
 * @param { string } description string - GraphQLObjectType\'s description
 * @param {{
 *  id: number, 
 *  subject: string,
 *  source: string,
 *  resourceName: string,
 *  link: string,
 *  image: string,
 *  estimatedTime: number,
 *  isConcluded: boolean,
 *  conclusionDate: number,
 *  user: object
 * }} fields object - fields representing user data 
 */
const StudyEventType = new graphql.GraphQLObjectType({
    name: 'StudyEvent',
    description: 'Study Event like [course, youtube, ebook/pdf]',
    fields: {
        id: { 
            type: graphql.GraphQLInt, 
            description: 'Study event id' 
        },
        subject: { 
            type: graphql.GraphQLString, 
            description: 'Study subject'  
        },
        source: { 
            type: graphql.GraphQLString, 
            description: 
            'Study source: [ONLINE_COURSE,YOUTUBE,PDF/EBOOK,BOOK]'
        },
        resourceName: { 
            type: graphql.GraphQLString, 
            description: 'Course\'s name or ebook/pdf title' 
        },
        link: { 
            type: graphql.GraphQLString, 
            description: 
            'Optional link (url) to ONLINE_COURSE/YOUTUBE video(s)'
        },
        image: { 
            type: 
            graphql.GraphQLString, 
            description: 
            'Optional image (url) ebook/pdf cover or video preview image'
        },
        estimatedTime: { 
            type: TimeStampType, 
            description: 
            'Optional timestamp when course or ebook/pdf will terminate' 
        },
        isConcluded: { 
            type: graphql.GraphQLBoolean, 
            description: 
            'Optional boolean [default value is false] ' 
            + 'the course or book is concluded?'
        },
        conclusionDate: { 
            type: TimeStampType,  
            description: 'Optional timestamp, date of conclusion' 
        },
        user: { 
            type: UserType, 
            description: 'User object data' 
        },
    }
});

/**
 * GraphQLObjectType StudyEventListType
 * @param {string} name string - GraphQLObjectType\'s name
 * @param {string} description string - GraphQLObjectType\'s description
 * @param {function} fields function - that returns an object with properties:
 * {
 *  UserStudyEvents {
 *   type: GraphQLList<StudyEvent>,
 *   description: string,
 *   resolve: function
 *  }
 * } 
 */
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

/**
 * GraphQLSchema studyEventCreate
 * @param { object } name Object - GraphQLObjectType StudyEventType
 * @param { string } description string - GraphQLSchema\'s description
 * @param { object } args object - with properties: {subject: string, 
 * source: string, resourceName: string, link: string, 
 * image: string, estimatedTime: number, isConcluded: boolean, 
 * conclusionDate: number} 
 * @param { function } resolve function to receive request and send response
 */
const studyEventCreate = {
    type: StudyEventType,
    description: 'Create a new StudyEvent',
    args: {
        subject: { 
            type: graphql.GraphQLString, 
            description: 'Study subject' 
        },
        source: { 
            type: graphql.GraphQLString, 
            description: 
            'Study source: [ONLINE_COURSE,YOUTUBE,PDF/EBOOK,BOOK]'
        },
        resourceName: { 
            type: graphql.GraphQLString, 
            description: 'Course\'s name or ebook/pdf title' 
        },
        link: { 
            type: graphql.GraphQLString, 
            description: 
            'Optional link (url) to ONLINE_COURSE/YOUTUBE video(s)'
        },
        image: { 
            type: graphql.GraphQLString, 
            description: 
            'Optional image (url) ebook/pdf cover or video preview image' 
        },
        estimatedTime: { 
            type: TimeStampType, 
            description: 
            'Optional timestamp when course or ebook/pdf will terminate' 
        },
        isConcluded: { 
            type: graphql.GraphQLBoolean, 
            description: 
            'Optional boolean [default value is false]' 
            + ' the course or book is concluded?'
        },
        conclusionDate: { 
            type: TimeStampType, 
            description: 'Optional timestamp, date of conclusion' 
        },        
    },
    resolve: rootResolvers.createStudyEvent
};


/**
 * GraphQLSchema studyEventUpdate
 * @param { object } name Object - GraphQLObjectType StudyEventType
 * @param { string } description string - GraphQLSchema\'s description
 * @param { object } args object - with properties: {id: number,
 * subject: string, source: string, resourceName: string, 
 * link: string, image: string, estimatedTime: number, 
 * isConcluded: boolean, conclusionDate: number} 
 * @param { function } resolve function to receive request and send response
 */
const studyEventUpdate = {
    type: StudyEventType,
    description: 'Update an existing StudyEvent',
    args: {
        id: {
            type: graphql.GraphQLInt, 
            description: 'Mandatory StudyEvent id'
        },
        subject: { 
            type: graphql.GraphQLString, 
            description: 'Optional Study subject' 
        },
        source: { 
            type: graphql.GraphQLString, 
            description: 
            'Optional Study source: [ONLINE_COURSE,YOUTUBE,PDF/EBOOK,BOOK]'
        },
        resourceName: { 
            type: graphql.GraphQLString, 
            description: 
            'Optional Course\'s name or ebook/pdf title' 
        },
        link: { 
            type: graphql.GraphQLString, 
            description: 
            'Optional link (url) to ONLINE_COURSE/YOUTUBE video(s)'
        },
        image: { type: graphql.GraphQLString, 
            description: 
            'Optional image (url) ebook/pdf cover or video preview image' 
        },
        estimatedTime: { 
            type: TimeStampType, 
            description: 'Optional timestamp when course or ebook/pdf will terminate' 
        },
        isConcluded: { 
            type: graphql.GraphQLBoolean, 
            description: 
            'Optional boolean [default value is false]' 
            + ' the course or book is concluded?'
        },
        conclusionDate: { 
            type: TimeStampType, 
            description: 'Optional timestamp, date of conclusion' 
        }
    },
    resolve: rootResolvers.updateStudyEvent
}

/**
 * GraphQLSchema studyEventDelete
 * @param { object } type Object - GraphQLObjectType StudyEventType
 * @param { string } description string - GraphQLSchema\'s description
 * @param { object } args object - with properties: {id: number}
 * @param { function } resolve function to receive request and send response
 */
const studyEventDelete = {
    type: StudyEventType,
    description: 'Delete an existing StudyEvent by id',
    args: {
        id: {
            type: graphql.GraphQLInt, 
            description: 'Mandatory field StudyEvent id'
        }
    },
    resolve: rootResolvers.deleteStudyEvent
}

/**
 * GraphQLSchema studyEventGetAll
 * @param { object } type Object - GraphQLObjectType StudyEvent
 * @param { string } description string - GraphQLSchema\'s description 
 * @param { function } resolve function to receive request and send response
 */
const studyEventGetAll = {
    type: StudyEventListType,
    description: 'Get All studyEvents',
    resolve: rootResolvers.getAllStudyEvents
}

/**
 * GraphQLSchema studyEventGetById
 * @param { object } type Object - GraphQLObjectType StudyEvent
 * @param { string } description string - GraphQLSchema\'s description
 * @param { object } args object - with properties: {id: number}
 * @param { function } resolve function to receive request and send response
 */
const studyEventGetById = {
    type: StudyEventType,
    description: 'Get StudyEvent by id',
    args: {
        id: { type: graphql.GraphQLInt, description: 'Mandatory field StudyEvent id'}
    },
    resolve: rootResolvers.getStudyEventById
}

module.exports = {
    studyEventCreate,
    studyEventUpdate,
    studyEventDelete,
    studyEventGetAll,
    studyEventGetById
}