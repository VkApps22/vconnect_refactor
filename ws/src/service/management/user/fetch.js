import mongoose from 'mongoose';
import { User } from '../../../domain/entity';
import { env } from '../../../config';
import { UserNotFoundError } from '../../../domain/error';

const buildTextQueryStage = ({ text }) => {
  const query = {};
  if (text && text.trim().length > 0)
    query.$text = {
      $search: `"${text.trim()}"`,
      $language: 'none',
      $caseSensitive: false,
      $diacriticSensitive: false,
    };

  return { $match: query };
};

function buildCompanyDomainQueryStage({ companyDomain }) {
  const query = {};
  if (companyDomain)
    query.email = {
      $regex: `@${env.COMPANY_EMAIL_DOMAIN.replace('.', '\\.')}$`,
      $options: 'i',
    };

  return { $match: query };
}

function buildFinalProjectionStage({ user }) {
  return {
    $project: {
      email: '$email',
      name: '$name',
      preferredName: '$preferredName',
      company: '$company',
      phone: '$phone',
      country: '$country',
      state: '$state',
      admin: { $gt: ['$accessLevel', 0] },
      canAdmin: {
        $and: [
          { $ne: ['$_id', mongoose.Types.ObjectId(user._id)] },
          { $lte: ['$accessLevel', user.accessLevel] },
          {
            $regexMatch: {
              input: '$email',
              regex: `@${env.COMPANY_EMAIL_DOMAIN}$`,
            },
          },
        ],
      },
    },
  };
}

function buildPaginationStage({ pagination }) {
  return {
    $facet: {
      items: [
        {
          $sort: {
            name: 1,
            preferredName: 1,
            email: 1,
          },
        },
        {
          $skip: pagination.page * pagination.limit,
        },
        {
          $limit: pagination.limit,
        },
      ],
      info: [
        {
          $group: {
            _id: null,
            count: {
              $sum: 1,
            },
          },
        },
      ],
    },
  };
}

export default async ({ userId, companyDomain, text, pagination }) => {
  const user = await User.findOne({ _id: userId });
  if (!user) throw new UserNotFoundError();

  const pipeline = [
    buildTextQueryStage({ text }),
    buildCompanyDomainQueryStage({ companyDomain }),
    buildFinalProjectionStage({ user }),
    buildPaginationStage({ pagination }),
  ];

  const result = (await User.aggregate(pipeline))[0];
  return {
    items: result.items,
    count: result.info.length > 0 ? result.info[0].count || 0 : 0,
  };
};
